import type { NextRequest } from "next/server"

import { appRouter } from "@/server"
import { createTRPCContext } from "@/server/trpc"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { env } from "@/lib/env"

async function createContext(req: NextRequest) {
  return createTRPCContext({
    headers: req.headers,
  })
}

function handler(req: NextRequest) {
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            )
          }
        : undefined,
  })
}

export { handler as GET, handler as POST }
