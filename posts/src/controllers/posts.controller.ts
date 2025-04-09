import { Hono } from 'hono'
import { prisma } from '../utils/prisma.js'
import { HTTPException } from 'hono/http-exception'

const postRouter = new Hono()

postRouter.basePath('/posts')
.get('/', async (ctx) => {
    const posts = await prisma.post.findMany();
    // ctx => context de la requête, c'est lui qui contient toutes les infos de la requête
    return ctx.json(posts);
  })


 .get('/:id', async (ctx) => {
    // Je vais récupérer l'id de l'utilisateur dans l'url
    const id = ctx.req.param('id');
    // Je vais chercher en BDD l'utilisateur avec cet id
    const post = await prisma.post.findUnique({
      where: {
        id: id
      }
    })

    // Si l'utilisateur n'existe pas, je renvoie une erreur 404
    if (!post) {
      throw new HTTPException(404, {
        message: 'User not found'
      });
    }


    return ctx.json(post);
  });


export default postRouter;