import { z } from "zod";
import bcrypt from 'bcrypt';
import 'dotenv/config'
import type { Context } from "hono";
import { sendEmail } from "../../util/Mail/mail.js";
import redis from "../../util/redis/redis.js";
import { generateNumericOTP } from "../../util/otp/opt.js";
import { UsersTable } from "../../../drizzle/schema.js";
import { db } from "../../model/connection.js";


const bodyVaildator = z.object({
    username: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().nonempty().min(6)
})

export async function signupAuth(c: Context) {
    try {
        const obj = bodyVaildator.parse(await c.req.parseBody())
        const tokenuser = {
            user: obj.username,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5
        }
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(obj.password, salt);
            await db.insert(UsersTable).values([{
                username: obj.username,
                email: obj.email,
                password: hash,
            }])
            const device = c.req.header()['user-agent']
            const otp = generateNumericOTP()
            await redis.setex('otp-' + obj.email, 60 * 15, `${otp}`)
            sendEmail({ email: obj.email, code: otp, device })
            return c.json({ message: "signup sucessfull" }, 200)
        } catch (e: any) {
            return c.json({ message: e.message }, 409)
        }
    } catch (e: any) {
        return c.json({
            message: e.message,
        }, 400)
    } finally {
    }
}

