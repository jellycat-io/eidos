import { Prisma } from "@prisma/client"
import { z } from "zod"

export interface FormStats {
  visits: number
  submissions: number
  submissionRate: number
  bounceRate: number
}

export type FormSummary = Prisma.FormGetPayload<{
  select: {
    id: true
    title: true
    description: true
    shareUrl: true
    updatedAt: true
  }
}>

export const requiredString = z.string().min(1, "Required").trim()
export const optionalString = z.string().trim()

export const createFormSchema = z.object({
  title: requiredString,
  description: optionalString,
})

export type CreateFormValues = z.infer<typeof createFormSchema>
