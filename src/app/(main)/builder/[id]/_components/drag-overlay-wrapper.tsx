"use client"

import { useState } from "react"

import { DragOverlay, useDndMonitor, type Active } from "@dnd-kit/core"

import { FORM_ELEMENTS } from "@/lib/constants"
import type { ElementType } from "@/lib/types"

import { SidebarElementButtonDragOverlay } from "./sidebar-element-button"

export function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

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
    node = <SidebarElementButtonDragOverlay formElement={FORM_ELEMENTS[type]} />
  }

  return <DragOverlay>{node}</DragOverlay>
}
