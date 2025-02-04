"use client"

import { api } from "@/trpc/react"
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

import { useDesigner } from "@/hooks/use-designer"
import { PreviewDialogButton } from "@/components/preview-dialog"
import { PublishFormButton } from "@/components/publish-form-button"
import { SaveFormButton } from "@/components/save-form-button"

import { Designer } from "./designer"
import { DragOverlayWrapper } from "./drag-overlay-wrapper"

interface FormBuilderProps {
  formId: string
}

export function FormBuilder({ formId }: FormBuilderProps) {
  const { data: form } = api.forms.getFormById.useQuery({ id: formId })
  const { elements, reorderElements } = useDesigner()

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    // Avoid reordering if the active item is dropped on itself.
    if (active.id === over.id) return

    const oldIndex = elements.findIndex((el) =>
      active.id.toString().includes(el.id),
    )
    const newIndex = elements.findIndex((el) =>
      over.id.toString().includes(el.id),
    )

    if (oldIndex === -1 || newIndex === -1) return

    reorderElements(oldIndex, newIndex)
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <section className="flex flex-col w-full">
        <header className="flex justify-between items-center p-4 gap-3 border-b border-border/50">
          <h2 className="truncate font-semibold text-lg">{form?.title}</h2>
          <div className="flex items-center gap-3">
            <PreviewDialogButton />
            {!form?.published && (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            )}
          </div>
        </header>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px]">
          <div className="absolute inset-0 bg-secondary bg-dot-slate-600" />
          <Designer />
        </div>
      </section>
      <DragOverlayWrapper />
    </DndContext>
  )
}
