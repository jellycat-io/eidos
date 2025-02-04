import { MdNumbers } from "react-icons/md"

import type {
  DesignerComponentProps,
  ElementType,
  FormElement,
} from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const NumberFieldFormElement: FormElement<"NumberField"> = {
  type: "NumberField",
  construct: (id: string) => ({
    id,
    type: "NumberField",
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
  designerComponent: DesignerComponent as React.FC<
    DesignerComponentProps<"NumberField">
  >,
  formComponent: () => <div>NumberField</div>,
  propertiesComponent: () => <div>NumberField</div>,
}

function DesignerComponent<T extends ElementType>({
  element,
}: DesignerComponentProps<T>) {
  const { label, placeholder, required, helperText } = element.extraAttributes

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input type="number" readOnly placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-xs">{helperText}</p>
      )}
    </div>
  )
}
