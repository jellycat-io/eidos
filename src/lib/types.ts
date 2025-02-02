import { z } from "zod"

export interface FormStats {
  visits: number
  submissions: number
  submissionRate: number
  bounceRate: number
}

export const requiredString = z.string().min(1, "Required").trim()
export const optionalString = z.string().trim().optional()

export const createFormSchema = z.object({
  title: requiredString,
  description: optionalString,
})

export type CreateFormValues = z.infer<typeof createFormSchema>

export const getFormSchema = z.object({
  id: z.string(),
})
