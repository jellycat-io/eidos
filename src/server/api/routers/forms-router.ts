import { ElementType, FormElementInstance, type FormStats } from "@/lib/types"
import {
  createFormSchema,
  getFormByUrlSchema,
  getFormSchema,
  publishFormSchema,
  saveFormSchema,
  submitFormSchema,
} from "@/lib/validation"

import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc"

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

  getSingleFormStats: privateProcedure
    .input(getFormSchema)
    .query(async ({ ctx, input }) => {
      const { id } = getFormSchema.parse(input)

      const stats = await ctx.db.form.findUnique({
        where: {
          id,
          userId: ctx.auth.userId,
        },
        select: {
          visits: true,
          submissions: true,
        },
      })

      if (!stats) {
        throw new Error("Form not found")
      }

      const visits = stats.visits ?? 0
      const submissions = stats.submissions ?? 0

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

  getFormByUrl: publicProcedure.input(getFormByUrlSchema).query(
    async ({
      ctx,
      input,
    }): Promise<{
      title: string
      elements: FormElementInstance<ElementType>[]
    }> => {
      const { url } = getFormByUrlSchema.parse(input)

      const form = await ctx.db.form.update({
        where: {
          shareUrl: url,
        },
        select: {
          title: true,
          content: true,
        },
        data: {
          visits: {
            increment: 1,
          },
        },
      })

      if (!form) {
        throw new Error("Form not found")
      }

      return {
        title: form.title,
        elements: JSON.parse(
          form.content,
        ) satisfies FormElementInstance<ElementType>[],
      }
    },
  ),

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
        where: { id, userId: ctx.auth.userId },
        data: {
          content,
        },
      })
    }),

  publishForm: privateProcedure
    .input(publishFormSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.form.update({
        where: { id: input.id, userId: ctx.auth.userId },
        data: {
          published: true,
        },
      })
    }),

  submitForm: publicProcedure
    .input(submitFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { shareUrl, content } = input
      await ctx.db.form.update({
        where: { shareUrl, published: true },
        data: {
          submissions: {
            increment: 1,
          },
          formSubmissions: {
            create: {
              content,
            },
          },
        },
      })
    }),
})
