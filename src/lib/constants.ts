import { NumberFieldFormElement } from "@/components/fields/number-field"
import { TextFieldFormElement } from "@/components/fields/text-field"

import type { FormElementsType } from "./types"

export const FORM_ELEMENTS: FormElementsType = {
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
}
