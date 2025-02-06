import { z } from "zod"

export const ElementAttributesSchema = z.object({
  label: z.string(),
  helperText: z.string().optional(),
  required: z.boolean().optional(),
})

export const TextFieldAttributesSchema = ElementAttributesSchema.extend({
  placeholder: z.string().optional(),
})

export const NumberFieldAttributesSchema = ElementAttributesSchema.extend({
  placeholder: z.string().optional(),
})

export const FormElementInstanceSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("TextField"),
    extraAttributes: TextFieldAttributesSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal("NumberField"),
    extraAttributes: NumberFieldAttributesSchema,
  }),
])

export const requiredString = z.string().trim().min(1, "Required")
export const optionalString = z.string().trim().optional()

export const createFormSchema = z.object({
  title: requiredString,
  description: optionalString,
})

export type CreateFormValues = z.infer<typeof createFormSchema>

export const saveFormSchema = z.object({
  id: requiredString,
  content: requiredString.refine((str) => {
    try {
      const parsed = JSON.parse(str)
      FormElementInstanceSchema.array().parse(parsed)
      return true
    } catch {
      return false
    }
  }),
})

export type SaveFormValues = z.infer<typeof saveFormSchema>

export const getFormSchema = z.object({
  id: z.string(),
})
