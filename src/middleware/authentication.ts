import type { Context } from "hono"
import { verifyToken } from "../util/jwt/jwt.js"

export function authenticationMiddleware(token: string, c: Context) {

    if (token === '') {

    }
    return false
}

export async function testAuthMiddleware(c: Context, next: any) {
    try {
        const regex = /(?<=^Bearer[\s*])[^\s]*$/
        const authorization = c.req.header().authorization ?? ""
        if (authorization && regex.test(authorization)) {
            const value = authorization.match(regex)
            const token = value !== null && value?.length > 0 ? value[0] : ''
            try {
                const verifytoken = await verifyToken(token)
                const regex = /(?<=^\/api\/)\w*/gm
                if (verifytoken) {
                    return next()
                } else {
                    return c.json({ "error": { "message": "authentication required" } }, 401)
                }
            } catch (e) {

                return c.json({ "error": { "message": "authentication required" } }, 401)
            }
        }

        return c.json({ "error": { "message": "authentication required" } }, 401)
    } catch (e) {
        return c.json({
            message: e
        }, 404)
    }
}
