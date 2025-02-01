import { createCallerFactory, createTRPCRouter, publicProcedure } from "./trpc"

export const appRouter = createTRPCRouter({
  ping: publicProcedure.query(() => "pong"),
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
