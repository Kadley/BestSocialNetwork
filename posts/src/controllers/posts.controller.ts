import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";


import { HTTPException } from "hono/http-exception";
import { zValidator } from '@hono/zod-validator';
import { z } from "zod";

const postCreateSchema = z.object({
  
  content: z.string().min(1),
  authorId: z.string().cuid(),
})

const idParamSchema = z.object({
  id: z.string().cuid(),
})

const postRouter = new Hono()

postRouter.basePath('/posts')
  .get('/', async (ctx) => {
    const posts = await prisma.post.findMany();
    return ctx.json(posts);
  })

  .get('/:id', zValidator('param', idParamSchema), async (ctx) => {
    const { id } = ctx.req.valid('param');
    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      throw new HTTPException(404, { message: 'Post not found' });
    }

    return ctx.json(post);
  })

  .post(
    '/',
    zValidator('json', postCreateSchema, (result, c) => {
      if (!result.success) {
        return c.json({ error: result.error }, 400)
      }
    })
    ,
    (c) => {
      const body = c.req.valid('json')
      return c.json({ message: 'Post reçu ✅', data: body })
    }
  )

  .patch(
    '/:id',
    zValidator('param', idParamSchema),
    zValidator('json', postCreateSchema.partial()),
    async (ctx) => {
      const { id } = ctx.req.valid('param');
      const data = ctx.req.valid('json');
  
      const post = await prisma.post.findUnique({ where: { id } });
      if (!post) {
        throw new HTTPException(404, { message: 'Post not found' });
      }
  
      const updatedPost = await prisma.post.update({
        where: { id },
        data,
      });
  
      return ctx.json(updatedPost);
    }
  )
  

  .delete('/:id', zValidator('param', idParamSchema), async (ctx) => {
    const { id } = ctx.req.valid('param');

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new HTTPException(404, { message: 'Post not found' });
    }

    await prisma.post.delete({ where: { id } });

    return ctx.json({ message: 'Post deleted' });
  });

export default postRouter;
