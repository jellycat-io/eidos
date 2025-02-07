"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { api } from "@/trpc/react"
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CopyCheckIcon,
  CopyIcon,
  LoaderCircleIcon,
} from "lucide-react"
import Confetti from "react-confetti"

import { useDesigner } from "@/hooks/use-designer"
import { Button } from "@/components/ui/button"
import { PreviewDialogButton } from "@/components/preview-dialog"
import { PublishFormButton } from "@/components/publish-form-button"
import { SaveFormButton } from "@/components/save-form-button"

import { Designer } from "./designer"
import { DragOverlayWrapper } from "./drag-overlay-wrapper"

interface FormBuilderProps {
  formId: string
}

export function FormBuilder({ formId }: FormBuilderProps) {
  const [copied, setCopied] = useState(false)
  const { data: form, isLoading } = api.forms.getFormById.useQuery({
    id: formId,
  })
  const { setElements } = useDesigner()

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

  useEffect(() => {
    if (form) {
      setElements(JSON.parse(form?.content))
    }
  }, [form, setElements])

  if (!form || isLoading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <LoaderCircleIcon className="size-12 shrink-0 text-accent animate-spin" />
      </div>
    )

  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false}
        />
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="max-w-xl flex flex-col gap-6">
            <h1 className="text-center text-4xl font-bold text-primary">
              Form published!
            </h1>
            <div className="border-t border-b space-y-2 px-4 py-6">
              <p className="text-xl">Share this form</p>
              <p className="text-muted-foreground">
                Anyone with the link can view and submit the form.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 px-4 py-2">
              <div className="px-4 py-2 bg-accent text-accent-foreground font-mono flex items-center justify-center rounded-md text-center">
                {shareUrl}
              </div>
              <Button
                className="w-full"
                disabled={copied}
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
              >
                {copied ? (
                  <>
                    <CopyCheckIcon />
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="w-full flex items-center justify-between border-t py-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  <ArrowLeftIcon />
                  Go to dashboard
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href={`/forms/${form.id}`}>
                  Go to form details
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

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
                <SaveFormButton formId={form.id} />
                <PublishFormButton formId={form.id} />
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
