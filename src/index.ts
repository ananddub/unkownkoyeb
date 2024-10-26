import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import 'dotenv/config'
import { user } from './Routes/user.js';
import authroute from './Routes/routes.js';


export const config = {
    runtime: 'edge'
}
const app = new Hono().basePath('/api')
app.route('/user', user)
app.route('/auth', authroute)
app.notFound((c) => {
    return c.text("404 Page Not Found")
})

const port: any = process.env.PORT
console.log(`Server is running on port ${port}`)

serve({ fetch: app.fetch, port })
