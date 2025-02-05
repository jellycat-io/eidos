import { FORM_ELEMENTS } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"

import { SidebarElementButton } from "./sidebar-element-button"

export function ElementsSidebar() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center h-9">
        <h3>Elements</h3>
      </div>
      <Separator className="mb-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {Object.entries(FORM_ELEMENTS).map(([k, el]) => (
          <SidebarElementButton key={k} element={el} />
        ))}
      </div>
    </div>
  )
}
