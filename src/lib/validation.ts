import { z } from "zod"

export const TextFieldAttributesSchema = z.object({
  label: z.string(),
  helperText: z.string().optional(),
  required: z.boolean().optional(),
  placeholder: z.string().optional(),
})

export const NumberFieldAttributesSchema = z.object({
  label: z.string(),
  helperText: z.string().optional(),
  required: z.boolean().optional(),
  placeholder: z.string().optional(),
})

export const HeadingAttributesSchema = z.object({
  title: z.string(),
})

export const SubHeadingAttributesSchema = z.object({
  title: z.string(),
})

export const ParagraphAttributesSchema = z.object({
  text: z.string(),
})

export const SeparatorAttributesSchema = z.object({})

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
  z.object({
    id: z.string(),
    type: z.literal("Heading"),
    extraAttributes: HeadingAttributesSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal("SubHeading"),
    extraAttributes: SubHeadingAttributesSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal("Paragraph"),
    extraAttributes: ParagraphAttributesSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal("Separator"),
    extraAttributes: SeparatorAttributesSchema,
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

export const getFormByUrlSchema = z.object({
  url: z.string(),
})

export const publishFormSchema = z.object({
  id: z.string(),
})

export const submitFormSchema = z.object({
  shareUrl: requiredString,
  content: requiredString,
})
