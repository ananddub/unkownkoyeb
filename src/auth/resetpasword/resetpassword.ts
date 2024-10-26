import { z } from "zod";
import bcrypt from 'bcrypt';
import 'dotenv/config'
import type { Context } from "hono";
import redis from "../../util/redis/redis.js";
import { UsersTable } from "../../../drizzle/schema.js";
import { db } from "../../model/connection.js";
import { eq } from "drizzle-orm";

const otpVaildator = z.object({
    email: z.string().email().nonempty(),
    code: z.string().nonempty(),
    password: z.string().nonempty().min(6)
})

export async function resetPassword(c: Context) {
    try {
        const obj = otpVaildator.parse(await c.req.parseBody())
        const otp = await redis.get('otp-' + obj.email)
        if (otp === obj.code) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(obj.password, salt);
            await db.update(UsersTable)
                .set({ password: hash })
                .where(eq(UsersTable.email, obj.email));
            await redis.del('otp-' + obj.email)
            return c.json({ message: "sucessfully updated" })
        } else {
            return c.json({ message: "invalid otp" }, 400)
        }
    } catch (e: any) {
        return c.json({
            message: e.message,
        }, 400)
    } finally {
    }
}

