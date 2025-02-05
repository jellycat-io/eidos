"use client"

import { useState } from "react"

import { DragOverlay, useDndMonitor, type Active } from "@dnd-kit/core"

import { FORM_ELEMENTS } from "@/lib/constants"
import type { ElementType, FormElement } from "@/lib/types"
import { useDesigner } from "@/hooks/use-designer"

import { SidebarElementButtonDragOverlay } from "./sidebar-element-button"

export function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)
  const { elements } = useDesigner()

  useDndMonitor({
    onDragStart: (e) => {
      setDraggedItem(e.active)
    },
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null),
  })

  if (!draggedItem) return null

  let node = <div>No drag overlay</div>
  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement
  const type = draggedItem.data?.current?.type as ElementType
  if (isSidebarBtnElement) {
    node = <SidebarElementButtonDragOverlay element={FORM_ELEMENTS[type]} />
  }

  const isDesignerComponent = draggedItem.data?.current?.isDesignerComponent
  if (isDesignerComponent) {
    const elementId = draggedItem.data?.current?.elementId

    const element = elements.find((el) => el.id === elementId)
    if (!element) {
      node = <div>Element not found</div>
    } else {
      const DesignerComponent = (
        FORM_ELEMENTS[element.type] as FormElement<typeof element.type>
      ).designerComponent
      node = (
        <div className="flex items-center bg-accent border rounded-md h-[120px] w-full px-4 py-2 opacity-80 pointer pointer-events-none">
          <DesignerComponent element={element} />
        </div>
      )
    }
  }

  return <DragOverlay>{node}</DragOverlay>
}
