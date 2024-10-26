import type { Context } from "hono";
import { z } from "zod";
import redis from "../../util/redis/redis.js";

const otpVaildator = z.object({
    email: z.string().email().nonempty(),
    code: z.string().nonempty()
})


export default async function verifyEmail(c: Context) {
    try {
        const obj = otpVaildator.parse(await c.req.parseBody())
        const otp = await redis.get('otp-' + obj.email)
        if (otp === obj.code) {
            await redis.del('otp-' + obj.email)
            return c.json({
                message: "verified"
            })
        } else {
            return c.json({
                message: "invalid otp"
            })
        }
    } catch (e) {
        return c.json({
            e: e
        })
    }
}
