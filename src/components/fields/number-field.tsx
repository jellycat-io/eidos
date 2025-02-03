import { MdNumbers } from "react-icons/md"

import type { ElementType, FormElement } from "@/lib/types"

const type: ElementType = "NumberField"

export const NumberFieldFormElement: FormElement<typeof type> = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Number field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
    },
  }),
  buttonComponent: {
    icon: MdNumbers,
    label: "Number Field",
  },
  designerComponent: () => <div className="text-white">NumberField</div>,
  formComponent: () => <div>NumberField</div>,
  propertiesComponent: () => <div>NumberField</div>,
}
