import { z } from "zod"

import {
  ElementAttributesSchema,
  NumberFieldAttributesSchema,
  TextFieldAttributesSchema,
} from "./validation"

export interface FormStats {
  visits: number
  submissions: number
  submissionRate: number
  bounceRate: number
}

export type ElementAttributesMap = {
  TextField: TextFieldAttributes
  NumberField: NumberFieldAttributes
}

export type ElementType = keyof ElementAttributesMap

export type ValidateFn = (
  element: FormElementInstance<ElementType>,
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
  validate: ValidateFn
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

export type ElementAttributes = z.infer<typeof ElementAttributesSchema>
export type TextFieldAttributes = z.infer<typeof TextFieldAttributesSchema>
export type NumberFieldAttributes = z.infer<typeof NumberFieldAttributesSchema>

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
