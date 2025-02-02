import { createFormSchema, type FormStats, type FormSummary } from "@/lib/types"

import { createTRPCRouter, privateProcedure } from "../trpc"

export const formRouter = createTRPCRouter({
  getFormStats: privateProcedure.query(async ({ ctx }) => {
    const stats = await ctx.db.form.aggregate({
      where: {
        userId: ctx.auth.userId,
      },
      _sum: {
        visits: true,
        submissions: true,
      },
    })

    const visits = stats._sum.visits ?? 0
    const submissions = stats._sum.submissions ?? 0

    let submissionRate = 0
    if (visits > 0) {
      submissionRate = (submissions / visits) * 100
    }

    const bounceRate = 100 - submissionRate

    return {
      visits,
      submissions,
      submissionRate,
      bounceRate,
    } satisfies FormStats
  }),

  getFormSummaries: privateProcedure.query(async ({ ctx }) => {
    const summaries: FormSummary[] = await ctx.db.form.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        shareUrl: true,
        updatedAt: true,
      },
    })

    return summaries
  }),

  createForm: privateProcedure
    .input(createFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, description } = input

      await ctx.db.form.create({
        data: {
          userId: ctx.auth.userId,
          title,
          description,
        },
      })
    }),
})
