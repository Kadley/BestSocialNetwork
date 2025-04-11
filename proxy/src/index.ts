import { serve } from '@hono/node-server'
import { debugLog, log } from './utils/debug.js'
import { Hono } from 'hono'
import { proxy } from 'hono/proxy'
import { join } from 'node:path'
import { secureHeaders } from 'hono/secure-headers'
import { cors } from 'hono/cors'


const app = new Hono()

app.use(secureHeaders())
app.use('*', cors())

app.use('*', (c, next) => {
  log(`Request method: ${c.req.method}, URL: ${c.req.url}`)
  return next()
})

app.use('/api/v1/users*', async (c) => {
  const url = join('http://user:3000', c.req.path)
  // Proxy va me permettre de rediriger la requête vers un autre serveur / service
  return proxy(url, {
    // Je transmet toutes les informations de la requête d'origine
    ...c.req,
  })
})
app.use('/api/v1/posts*', async (c) => {
    const url = join('http://posts:3002', c.req.path)
    return proxy(url, {
      ...c.req,
    })
  })
  
app.get('/', (c) => {
  debugLog('Debug log: Hello Hono!')
  return c.text('Hello Proxy!')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})  