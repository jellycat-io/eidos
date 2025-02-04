import { MdTextFields } from "react-icons/md"

import type {
  DesignerComponentProps,
  ElementType,
  FormElement,
} from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const TextFieldFormElement: FormElement<"TextField"> = {
  type: "TextField",
  construct: (id: string) => ({
    id,
    type: "TextField",
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
  designerComponent: DesignerComponent as React.FC<
    DesignerComponentProps<"TextField">
  >,
  formComponent: () => <div>TextField</div>,
  propertiesComponent: () => <div>TextField</div>,
}

function DesignerComponent<T extends ElementType>({
  element,
}: DesignerComponentProps<T>) {
  const { label, placeholder, required, helperText } = element.extraAttributes

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-xs">{helperText}</p>
      )}
    </div>
  )
}
