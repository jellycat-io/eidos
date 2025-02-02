import { createFormSchema, type FormStats } from "@/lib/types"

import { createTRPCRouter, privateProcedure } from "../trpc"

export const formsRouter = createTRPCRouter({
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

  getForms: privateProcedure.query(async ({ ctx }) => {
    const forms = await ctx.db.form.findMany({
      where: {
        userId: ctx.auth.userId,
      },
    })

    return forms
  }),

  createForm: privateProcedure
    .input(createFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, description } = input

      const form = await ctx.db.form.create({
        data: {
          userId: ctx.auth.userId,
          title,
          description,
        },
      })

      return {
        formId: form.id,
      }
    }),
})
