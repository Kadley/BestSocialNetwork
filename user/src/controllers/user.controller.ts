import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { HTTPException } from "hono/http-exception";
import { zValidator } from '@hono/zod-validator'
import { z } from "zod";

const userCreateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  birthDate: z.coerce.date().optional(),
  cityOfBirth: z.string().optional(),
  city: z.string().optional(),
})

const idParamSchema = z.object({
  id: z.string().cuid(),
})

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
  })
  .post(
    '/',
    zValidator('json', userCreateSchema),
    async (ctx) => {
      // Ici je récupère les donnés de la requête validées juste avant
      const data = ctx.req.valid('json')

      // On vérifie que l'email n'existe pas déjà en BDD
      const userExists = await prisma.user.findUnique({
        where: {
          email: data.email
        }
      })
      // Si l'utilisateur existe déjà, je renvoie une erreur 409
      if (userExists) {
        throw new HTTPException(409, {
          message: 'User already exists'
        });
      }

      // Je vais créer l'utilisateur en BDD
      const userCreated = await prisma.user.create({
        data: data,
        omit: {
          // L'utilisateur se créer avec le mot de passe
          // Mais je ne souhaite pas le renvoyer dans la réponse
          password: true,
        }
      })

      return ctx.json(userCreated)
    })
  .patch(
    '/:id', 
    zValidator('json', userCreateSchema.partial()),
    zValidator('param', idParamSchema),
    async (ctx) => {
      const { id } = ctx.req.valid('param')
      const data = ctx.req.valid('json')

      // Je vais chercher l'utilisateur en BDD
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

      // Je vais mettre à jour l'utilisateur en BDD
      const userUpdated = await prisma.user.update({
        where: {
          id: id,
        },
        data: data,
        omit: {
          password: true,
        }
      })

      return ctx.json(userUpdated)
    })
    .delete(
      '/:id',
      zValidator('param', idParamSchema),
      async (ctx) => {
        const { id } = ctx.req.valid('param')

        // Je vais chercher l'utilisateur en BDD
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

        // Je vais supprimer l'utilisateur en BDD
        await prisma.user.delete({
          where: {
            id: id
          }
        })

        return ctx.json({ message: 'User deleted' })
      }
    );


export default userRouter;