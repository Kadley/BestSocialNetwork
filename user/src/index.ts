import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userRouter from './controllers/user.controller.js'

const app = new Hono()

// Je rajoute les routes définies dans le fichier user.controller.ts sur mon router hono
// J'aurai donc les routes `/api/v1/users` et `/api/v1/users/:id`
app.route('/api/v1', userRouter);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})