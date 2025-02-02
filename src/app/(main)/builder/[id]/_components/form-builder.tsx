"use client"

import { api } from "@/trpc/react"

import { PreviewDialogButton } from "@/components/preview-dialog"
import { PublishFormButton } from "@/components/publish-form-button"
import { SaveFormButton } from "@/components/save-form-button"

import { Designer } from "./designer"

interface FormBuilderProps {
  formId: string
}

export function FormBuilder({ formId }: FormBuilderProps) {
  const { data: form } = api.forms.getFormById.useQuery({ id: formId })

  if (!form) return

  return (
    <section className="flex flex-col w-full">
      <header className="flex justify-between items-center p-4 gap-3">
        <h2 className="truncate font-semibold text-lg">{form.title}</h2>
        <div className="flex items-center gap-2">
          <PreviewDialogButton />
          {!form.published && (
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
  )
}
