"use client"

import { api } from "@/trpc/react"

export function FormsList() {
  const { data: formSummaries } = api.form.getFormSummaries.useQuery()

  return (
    <>{formSummaries?.map((form) => <span key={form.id}>{form.title}</span>)}</>
  )
}
