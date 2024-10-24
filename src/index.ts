import { serve } from '@hono/node-server'
import 'dotenv/config'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

const port: any = process.env.PORT
console.log(`Server is running on port ${port}`)

serve({ fetch: app.fetch, port })
