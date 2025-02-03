"use client"

import { useDraggable } from "@dnd-kit/core"

import type { AnyFormElement } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarElementButtonProps {
  formElement: AnyFormElement
}

export function SidebarElementButton({
  formElement,
}: SidebarElementButtonProps) {
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  })

  const { label, icon: Icon } = formElement.buttonComponent

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex flex-col gap-2 size-[120px] cursor-grab [&_svg]:size-8",
        draggable.isDragging && "ring-2 ring-primary",
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}

export function SidebarElementButtonDragOverlay({
  formElement,
}: SidebarElementButtonProps) {
  const { label, icon: Icon } = formElement.buttonComponent

  return (
    <Button
      variant="outline"
      className="flex flex-col gap-2 size-[120px] cursor-grab [&_svg]:size-8"
    >
      <Icon className="text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}
