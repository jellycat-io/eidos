"use client"

import { api } from "@/trpc/react"
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

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

  return (
    <DndContext sensors={sensors}>
      <section className="flex flex-col w-full">
        <header className="flex justify-between items-center p-4 gap-3 border-b border-border/50">
          <div className="flex flex-col space-y-0.5">
            <h2 className="truncate font-bold text-lg">{form?.title}</h2>
            <p className="text-sm text-muted-foreground">{form?.description}</p>
          </div>
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
