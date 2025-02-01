import { auth } from "@clerk/nextjs/server"
import { initTRPC } from "@trpc/server"
import SuperJSON from "superjson"
import { ZodError } from "zod"

import { db } from "./db"

export async function createTRPCContext(opts: { headers: Headers }) {
  const user = await auth()

  return {
    db,
    auth: user,
    ...opts,
  }
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<TRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now()

  if (t._config.isDev) {
    // Artificial delay in development
    const waitMs = Math.floor(Math.random() * 400) + 100
    await new Promise((resolve) => setTimeout(resolve, waitMs))
  }

  const result = await next()

  const end = Date.now()
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

  return result
})

const authMiddleWare = t.middleware(async ({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new Error("Unauthorized")
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth as Required<typeof ctx.auth>,
    },
  })
})

export const publicProcedure = t.procedure.use(timingMiddleware)
export const privateProcedure = t.procedure
  .use(authMiddleWare)
  .use(timingMiddleware)
