import { FORM_ELEMENTS } from "@/lib/constants"

import { SidebarElementButton } from "./sidebar-element-button"

export function DesignerSidebar() {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-3 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      <h3 className="font-semibold">Elements</h3>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        <SidebarElementButton formElement={FORM_ELEMENTS.TextField} />
        <SidebarElementButton formElement={FORM_ELEMENTS.NumberField} />
      </div>
    </aside>
  )
}
