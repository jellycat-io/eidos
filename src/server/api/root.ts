import { formRouter } from "./routers/form-router"
import { createCallerFactory, createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  form: formRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
