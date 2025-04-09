import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

// Données factices pour tester
const fakePosts = [
  { id: '1', content: 'This is a test post 1', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', content: 'This is a test post 2', createdAt: new Date(), updatedAt: new Date() },
  { id: '3', content: 'This is a test post 3', createdAt: new Date(), updatedAt: new Date() }
]

const postRouter = new Hono()

// Route pour récupérer tous les posts
postRouter.get('/posts', async (ctx) => {
  return ctx.json(fakePosts)  // Renvoie les données factices
})

// Route pour récupérer un post spécifique par son ID
postRouter.get('/posts/:id', async (ctx) => {
  const id = ctx.req.param('id')
  const post = fakePosts.find((p) => p.id === id)

  // Si le post n'existe pas, renvoie une erreur 404
  if (!post) {
    throw new HTTPException(404, { message: 'Post not found' })
  }

  return ctx.json(post)  // Renvoie le post spécifique
})

export default postRouter
