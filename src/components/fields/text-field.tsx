import { MdTextFields } from "react-icons/md"

import type { ElementType, FormElement } from "@/lib/types"

const type: ElementType = "TextField"

export const TextFieldFormElement: FormElement<typeof type> = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
    },
  }),
  buttonComponent: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: () => <div className="text-white">TextField</div>,
  formComponent: () => <div>TextField</div>,
  propertiesComponent: () => <div>TextField</div>,
}
