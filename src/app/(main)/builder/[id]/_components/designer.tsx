"use client"

import { useDndMonitor, useDroppable, type DragEndEvent } from "@dnd-kit/core"

import { FORM_ELEMENTS } from "@/lib/constants"
import { generateId } from "@/lib/id-generator"
import type { ElementType, FormElementInstance } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useDesigner } from "@/hooks/use-designer"

import { DesignerSidebar } from "./designer-sidebar"

export function Designer() {
  const { elements, addElement } = useDesigner()
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  })

  useDndMonitor({
    onDragEnd: (e: DragEndEvent) => {
      const { active, over } = e
      if (!active || !over) return

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement
      if (isDesignerBtnElement) {
        const type = active.data?.current?.type
        const newElement =
          FORM_ELEMENTS[type as ElementType].construct(generateId())

        addElement(0, newElement)
      }
    },
  })

  return (
    <div className="z-10 flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary",
          )}
        >
          {!elements.length && !droppable.isOver && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20" />
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col text-background w-full gap-2 p-4">
              {elements.map((el) => (
                <DesignerElementWrapper key={el.id} element={el} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  )
}

interface DesignerElementWrapperProps {
  element: FormElementInstance
}

function DesignerElementWrapper({ element }: DesignerElementWrapperProps) {
  const DesignerElement = FORM_ELEMENTS[element.type].designerComponent

  return <DesignerElement />
}
