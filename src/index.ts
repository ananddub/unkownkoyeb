import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import 'dotenv/config'
import { user } from './Routes/user.js';
import authroute from './Routes/routes.js';


export const config = {
    runtime: 'edge'
}
const app = new Hono()
app.route('/user', user)
app.route('/auth', authroute)
app.notFound((c) => {
    return c.json(
        {
            text: "new url",
            message: c.req
        },
        404
    )
})

const port: any = process.env.PORT
console.log(`Server is running on port ${port}`)

serve({ fetch: app.fetch, port })
