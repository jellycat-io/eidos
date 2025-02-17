import { RiSeparator } from "react-icons/ri"

import type { FormElement } from "@/lib/types"
import { Separator } from "@/components/ui/separator"

export const SeparatorElement: FormElement<"Separator"> = {
  type: "Separator",
  construct: (id: string) => ({
    id,
    type: "Separator",
    extraAttributes: {},
  }),
  buttonComponent: {
    icon: RiSeparator,
    label: "Separator",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
}

function DesignerComponent() {
  return <Separator />
}

function FormComponent() {
  return <Separator className="my-2" />
}

function PropertiesComponent() {
  return (
    <p className="text-sm text-muted-foreground text-center">
      No properties for this element.
    </p>
  )
}
