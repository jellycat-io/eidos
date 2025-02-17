import { FORM_ELEMENTS } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"

import { SidebarElementButton } from "./sidebar-element-button"

export function ElementsSidebar() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center px-4 pt-4 pb-2">
        <h3>Layout Elements</h3>
      </div>
      <Separator className="mb-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 place-items-center">
        {Object.entries(FORM_ELEMENTS)
          .filter(([_, el]) => !el.validate)
          .map(([k, el]) => (
            <SidebarElementButton key={k} element={el} />
          ))}
      </div>
      <Separator className="mt-4" />
      <div className="flex items-center px-4 py-2">
        <h3>Form Elements</h3>
      </div>
      <Separator className="mb-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 place-items-center">
        {Object.entries(FORM_ELEMENTS)
          .filter(([_, el]) => !!el.validate)
          .map(([k, el]) => (
            <SidebarElementButton key={k} element={el} />
          ))}
      </div>
    </div>
  )
}
