import type { Context } from "hono";
import bcrypt from 'bcrypt'
import { z } from "zod";
import { genrateToken } from "../../util/jwt/jwt.js";
import { UsersTable } from "../../../drizzle/schema.js";
import { eq } from "drizzle-orm";
import { db } from "../../model/connection.js";

const bodyVaildator = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty().min(6)
})
export async function loginAuth(c: Context) {
    try {
        const obj = bodyVaildator.parse(await c.req.parseBody())
        const user = await db().select().from(UsersTable).where(eq(UsersTable.email, obj.email))
        if (user.length > 0) {
            const match = await bcrypt.compare(obj.password, user[0].password)
            if (match) {
                const tokenuser = {
                    user: user[0].email,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5
                }
                const token = await genrateToken(tokenuser)
                const obj: any = user[0]
                delete obj.password;
                delete obj.id
                delete obj.createdAt
                return c.json({ token, user: obj }, 200)
            }
        }
        return c.json(
            { message: "user not found" }
            , 404)

    } catch (e: any) {
        return c.json({
            message: e.message
        }, 400)
    }
}


