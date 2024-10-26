import type { Context } from "hono";

export async function loginAuth(c: Context) {
    return c.text("hello User Login")
}


