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

export type ElementAttributesMap = {
  TextField: TextFieldAttributes
  NumberField: NumberFieldAttributes
}

export type ElementType = keyof ElementAttributesMap

export interface FormElement<T extends ElementType> {
  type: T
  buttonComponent: {
    icon: React.ElementType
    label: string
  }
  construct: (id: string) => FormElementInstance<T>
  designerComponent: React.FC<DesignerComponentProps<T>>
  formComponent: React.FC
  propertiesComponent: React.FC
}

export type AnyFormElement = FormElement<ElementType>

export type FormElementsType = {
  [K in ElementType]: FormElement<K>
}

export interface FormElementInstance<T extends ElementType> {
  id: string
  type: T
  extraAttributes: ElementAttributesMap[T]
}

export interface ElementAttributes {
  label: string
  helperText: string
  required: boolean
}

export type TextFieldAttributes = ElementAttributes & {
  placeholder: string
}

export type NumberFieldAttributes = ElementAttributes & {
  placeholder: string
}

export interface DesignerComponentProps<T extends ElementType> {
  element: FormElementInstance<T>
}
