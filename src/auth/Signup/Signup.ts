import { z } from "zod";
import type { Context } from "hono";
import { genrateToken } from "../../util/jwt/jwt.js";
import { sendEmail } from "../../util/Mail/mail.js";
import redis from "../../util/redis/redis.js";
import { generateNumericOTP } from "../../util/otp/opt.js";

const bodyVaildator = z.object({
    username: z.string().nonempty(),
    email: z.string().email().nonempty(),
    role: z.string().nonempty(),
    password: z.string().nonempty().min(6)
})

export async function signupAuth(c: Context) {
    try {
        const obj = bodyVaildator.parse(await c.req.parseBody())
        const tokenuser = {
            user: obj.username,
            role: obj.role,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5
        }
        const device = c.req.header()['user-agent']
        const otp = generateNumericOTP()
        await redis.setex('otp-' + obj.email, 60 * 15, `${otp}`)
        sendEmail({
            email: obj.email,
            code: otp, device
        })
        return c.json({ token: (await genrateToken(tokenuser)) })
    } catch (e) {
        console.log(e)
        return c.json({
            message: e,
            data: (await c.req.parseBody()) ?? "undefined"
        }, 404)
    }
}

