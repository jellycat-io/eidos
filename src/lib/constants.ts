import { HeadingElement } from "@/components/fields/heading"
import { NumberFieldFormElement } from "@/components/fields/number-field"
import { ParagraphElement } from "@/components/fields/paragraph"
import { SeparatorElement } from "@/components/fields/separator"
import { SubHeadingElement } from "@/components/fields/sub-heading"
import { TextFieldFormElement } from "@/components/fields/text-field"

import type { FormElementsType } from "./types"

export const FORM_ELEMENTS: FormElementsType = {
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
  Heading: HeadingElement,
  SubHeading: SubHeadingElement,
  Paragraph: ParagraphElement,
  Separator: SeparatorElement,
}
