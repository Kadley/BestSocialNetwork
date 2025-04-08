import { serve } from '@hono/node-server'
import { debugLog, log } from './utils/debug.js'
import { Hono } from 'hono'

const app = new Hono()

app.use('*', (c, next) => {
  log(`Request method: ${c.req.method}, URL: ${c.req.url}`)
  return next()
})

app.get('/', (c) => {
  debugLog('Debug log: Hello Hono!')
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
