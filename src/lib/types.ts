import { z } from "zod"

import {
  HeadingAttributesSchema,
  NumberFieldAttributesSchema,
  ParagraphAttributesSchema,
  SeparatorAttributesSchema,
  SubHeadingAttributesSchema,
  TextFieldAttributesSchema,
} from "./validation"

export interface FormStats {
  visits: number
  submissions: number
  submissionRate: number
  bounceRate: number
}

export type TextFieldAttributes = z.infer<typeof TextFieldAttributesSchema>
export type NumberFieldAttributes = z.infer<typeof NumberFieldAttributesSchema>
export type HeadingAttributes = z.infer<typeof HeadingAttributesSchema>
export type SubHeadingAttributes = z.infer<typeof SubHeadingAttributesSchema>
export type ParagraphAttributes = z.infer<typeof ParagraphAttributesSchema>
export type SeparatorAttributes = z.infer<typeof SeparatorAttributesSchema>

export type ElementAttributesMap = {
  TextField: TextFieldAttributes
  NumberField: NumberFieldAttributes
  Heading: HeadingAttributes
  SubHeading: SubHeadingAttributes
  Paragraph: ParagraphAttributes
  Separator: SeparatorAttributes
}

export type ElementType = keyof ElementAttributesMap

export type ValidateFn<T extends ElementType> = (
  element: FormElementInstance<T>,
  value: string,
) => string | null

export interface FormElement<T extends ElementType> {
  type: T
  buttonComponent: {
    icon: React.ElementType
    label: string
  }
  construct: (id: string) => FormElementInstance<T>
  designerComponent: React.FC<DesignerComponentProps<T>>
  formComponent: React.FC<FormComponentProps<T>>
  propertiesComponent: React.FC<PropertiesComponentProps<T>>
  validate?: ValidateFn<T>
}

export type AnyFormElement = { [K in ElementType]: FormElement<K> }[ElementType]

export type FormElementsType = {
  [K in ElementType]: FormElement<K>
}

export interface FormElementInstance<T extends ElementType> {
  id: string
  type: T
  extraAttributes: ElementAttributesMap[T]
}

export interface DesignerComponentProps<T extends ElementType> {
  element: FormElementInstance<T>
}

export interface FormComponentProps<T extends ElementType> {
  element: FormElementInstance<T>
  defaultValue?: string
  onChange?: (key: string, value: string) => void
  error?: string | null
}

export interface PropertiesComponentProps<T extends ElementType> {
  element: FormElementInstance<T>
}
