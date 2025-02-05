import { XIcon } from "lucide-react"

import { FORM_ELEMENTS } from "@/lib/constants"
import type { PropertiesComponentProps } from "@/lib/types"
import { useDesigner } from "@/hooks/use-designer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function PropertiesSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner()

  if (!selectedElement) return null

  const PropertiesComponent = FORM_ELEMENTS[selectedElement.type]
    .propertiesComponent as React.FC<
    PropertiesComponentProps<typeof selectedElement.type>
  >

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p>Element properties</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setSelectedElement(null)}
        >
          <XIcon />
        </Button>
      </div>

      <Separator className="mb-4" />
      <PropertiesComponent element={selectedElement} />
    </div>
  )
}
