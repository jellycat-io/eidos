import { useDesigner } from "@/hooks/use-designer"

import { ElementsSidebar } from "./elements-sidebar"
import { PropertiesSidebar } from "./properties-sidebar"

export function DesignerSidebar() {
  const { selectedElement } = useDesigner()
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-3 border-l-2 border-muted bg-background overflow-y-auto h-full">
      {selectedElement && <PropertiesSidebar />}
      {!selectedElement && <ElementsSidebar />}
    </aside>
  )
}
