import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth'
import { bearerAuth } from 'hono/bearer-auth'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { testAuthMiddleware } from '../middleware/authentication.js';

export const user = new Hono()

// app.use('*', bearerAuth({ verifyToken: authenticationMiddleware }))
user.use("*", testAuthMiddleware)
user.use('*', prettyJSON())

user.get('/', async (c) => {
    return c.json({ message: "hello user" })
})


