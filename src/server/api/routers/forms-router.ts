import { type FormStats } from "@/lib/types"
import {
  createFormSchema,
  getFormSchema,
  saveFormSchema,
} from "@/lib/validation"

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
      orderBy: {
        updatedAt: "desc",
      },
    })

    return forms
  }),

  getFormById: privateProcedure
    .input(getFormSchema)
    .query(async ({ ctx, input }) => {
      const { id } = getFormSchema.parse(input)
      const form = await ctx.db.form.findUnique({
        where: {
          id,
        },
      })

      if (!form) {
        throw new Error(`Form not found <${id}>`)
      }

      return form
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

  saveForm: privateProcedure
    .input(saveFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, content } = input

      await ctx.db.form.update({
        where: { id },
        data: {
          content,
        },
      })
    }),
})
