import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { HTTPException } from "hono/http-exception";

// `new Hono` me permet de récupérer un routeur comme dans express
const userRouter = new Hono()

userRouter.basePath('/users')
  .get('/', async (ctx) => {
    const users = await prisma.user.findMany();
    // ctx => context de la requête, c'est lui qui contient toutes les infos de la requête
    return ctx.json(users);
  })
  .get('/:id', async (ctx) => {
    // Je vais récupérer l'id de l'utilisateur dans l'url
    const id = ctx.req.param('id');
    // Je vais chercher en BDD l'utilisateur avec cet id
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    // Si l'utilisateur n'existe pas, je renvoie une erreur 404
    if (!user) {
      throw new HTTPException(404, {
        message: 'User not found'
      });
    }


    return ctx.json(user);
  });


export default userRouter;
