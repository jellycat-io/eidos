"use client"

import { api } from "@/trpc/react"

import { Loader } from "@/components/loader"

import { FormLinkShare } from "./form-link-share"
import { FormStatCards } from "./form-stat-cards"
import { VisitButton } from "./visit-button"

interface FormDetailsProps {
  formId: string
}

export function FormDetails({ formId }: FormDetailsProps) {
  const { data: form, isLoading } = api.forms.getFormById.useQuery({
    id: formId,
  })

  if (!form || isLoading) return <Loader />

  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 gap-3 border-b border-muted">
        <h1 className="text-2xl font-bold truncate">{form.title}</h1>
        <VisitButton shareUrl={form.shareUrl} />
      </header>
      <div className="p-4 border-b border-muted">
        <div className="flex items-center justify-between">
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className="my-8 px-8">
        <FormStatCards formId={formId} loading={isLoading} />
      </div>
      <div className="my-8 px-8">
        <SubmissionsTable formId={form.id} />
      </div>
    </div>
  )
}

interface SubmissionsTableProps {
  formId: string
}

function SubmissionsTable({ formId }: SubmissionsTableProps) {
  return (
    <>
      <h1 className="text-2xl font-bold">Submissions</h1>
    </>
  )
}
