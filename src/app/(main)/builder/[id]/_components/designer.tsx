"use client"

import { useState } from "react"

import {
  useDndMonitor,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from "@dnd-kit/core"
import { Trash2Icon } from "lucide-react"

import { FORM_ELEMENTS } from "@/lib/constants"
import { generateId } from "@/lib/id-generator"
import type { ElementType, FormElementInstance } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useDesigner } from "@/hooks/use-designer"
import { Button } from "@/components/ui/button"
import { Clickable } from "@/components/ui/clickable"

import { DesignerSidebar } from "./designer-sidebar"

export function Designer() {
  const { elements, addElement, selectedElement, setSelectedElement } =
    useDesigner()
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
      <Clickable
        className="p-4 w-full"
        onClick={(e) => {
          e.stopPropagation()
          if (selectedElement) setSelectedElement(null)
        }}
      >
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
          {!elements.length && droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20" />
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col text-background w-full gap-4 p-4">
              {elements.map((el) => (
                <DesignerComponentWrapper key={el.id} element={el} />
              ))}
            </div>
          )}
        </div>
      </Clickable>
      <DesignerSidebar />
    </div>
  )
}

interface DesignerComponentWrapperProps<T extends ElementType> {
  element: FormElementInstance<T>
}

function DesignerComponentWrapper<T extends ElementType>({
  element,
}: DesignerComponentWrapperProps<T>) {
  const [mouseOver, setMouseOver] = useState(false)
  const { selectedElement, setSelectedElement, removeElement } = useDesigner()

  const topHalf = useDroppable({
    id: `${element.id}-top`,
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerComponent: true,
    },
  })

  const bottomHalf = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerComponent: true,
    },
  })

  const draggable = useDraggable({
    id: `${element.id}-drag-handler`,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerComponent: true,
    },
  })

  if (draggable.isDragging) return null

  const DesignerComponent = FORM_ELEMENTS[element.type].designerComponent

  return (
    <Clickable
      ref={draggable.setNodeRef}
      className={cn(
        "relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent",
        selectedElement?.id === element.id && "ring-primary",
      )}
      onMouseEnter={() => {
        setMouseOver(true)
      }}
      onMouseLeave={() => {
        setMouseOver(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
      }}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      {/* Top drop zone */}
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      {/* Bottom drop zone */}
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2 bottom-0 rounded-b-md"
      />
      {/* Hover overlay */}
      <div
        className={cn(
          "group absolute inset-0 opacity-0 transition-opacity duration-300 z-10",
          mouseOver && !topHalf.isOver && !bottomHalf.isOver && "opacity-100",
        )}
      >
        <div className="absolute right-0 h-full">
          <Button
            variant="destructive"
            className="flex items-center justify-center h-full border rounded-md rounded-l-none"
            onClick={() => removeElement(element.id)}
          >
            <Trash2Icon className="size-6" />
          </Button>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
          <p className="text-sm">Click for properties or drag to move</p>
        </div>
      </div>
      {/* Top drop zone over indicator */}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md rounded-b-none h-2 bg-primary z-20" />
      )}
      {/* Bottom drop zone over indicator */}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md rounded-t-none h-2 bg-primary z-20" />
      )}
      <div
        className={cn(
          "w-full h-[120px] flex items-center rounded-md px-4 py-2 pointer-events-none opacity-100 transition-opacity duration-300",
          mouseOver && !topHalf.isOver && !bottomHalf.isOver && "opacity-30",
        )}
      >
        <DesignerComponent element={element} />
      </div>
    </Clickable>
  )
}
