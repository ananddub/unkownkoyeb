import type { Context } from "hono";
import { z } from "zod";
import redis from "../../util/redis/redis.js";
import { UsersTable } from "../../../drizzle/schema.js";
import { eq } from "drizzle-orm";
import { db } from "../../model/connection.js";

const otpVaildator = z.object({
    email: z.string().email().nonempty(),
    code: z.string().nonempty()
})

export default async function verifyEmail(c: Context) {
    try {
        const obj = otpVaildator.parse(await c.req.parseBody())
        const redisvalue = redis()
        const otp = await redisvalue.get('otp-' + obj.email)
        if (otp === obj.code) {
            await db().update(UsersTable)
                .set({ isVerifed: true })
                .where(eq(UsersTable.email, obj.email));
            try {
                await redisvalue.del('otp-count-' + obj.email)
                await redisvalue.del('otp-' + obj.email)
            } catch (e) {

            }
            return c.json({ message: "verified" })
        } else {
            return c.json({ message: "invalid otp" }, 400)
        }
    } catch (e: any) {
        return c.json({
            e: e.message
        }, 400)
    }
}
