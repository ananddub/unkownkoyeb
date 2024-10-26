import { z } from "zod";
import 'dotenv/config'
import type { Context } from "hono";
import { sendEmail } from "../../util/Mail/mail.js";
import redis from "../../util/redis/redis.js";
import { generateNumericOTP } from "../../util/otp/opt.js";
import { UsersTable } from "../../../drizzle/schema.js";
import { db } from "../../model/connection.js";
import { eq } from "drizzle-orm";

const bodyVaildator = z.object({
    email: z.string().email().nonempty(),
})

export async function requestOtp(c: Context) {
    try {
        const obj: any = bodyVaildator.parse(await c.req.parseBody())
        try {
            const user = await db.select().from(UsersTable).where(eq(UsersTable.email, obj.email))
            if (user.length == 0) {
                return c.json({ message: "user not found" }, 404)
            }
            const device = c.req.header()['user-agent']
            const otp = generateNumericOTP()
            const emailKey = 'resetpassword-otp-' + obj.email
            const countKey = 'otp-count-' + obj.email
            const requestCount = parseInt(await redis.get(countKey)) || 0
            if (requestCount >= 5) {
                return c.json(
                    { message: "Too many requests. Please wait 30 minutes before trying again." }
                    , 429)
            }

            await redis.multi()
                .incr(countKey)
                .expire(countKey, 60 * 30)
                .setex(emailKey, 60 * 5, `${otp}`)
                .exec()

            sendEmail({ email: obj.email, code: otp, device })
            return c.json({ message: "OTP sent successfully" }, 200)
        } catch (e: any) {
            return c.json({ message: e.message }, 409)
        }
    } catch (e: any) {
        return c.json({
            message: e.message,
        }, 400)
    }
}
