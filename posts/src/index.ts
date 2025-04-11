import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import postRouter from './controllers/posts.controller.js'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1', postRouter)

serve({
  fetch: app.fetch,
  port: 3002
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
