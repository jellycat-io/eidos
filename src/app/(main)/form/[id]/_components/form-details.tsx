"use client"

import { api, RouterOutputs } from "@/trpc/react"
import { formatDistance } from "date-fns"

import { ElementType, FormElementInstance } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader } from "@/components/loader"

import { FormLinkShare } from "./form-link-share"
import { FormStatCards } from "./form-stat-cards"
import { VisitButton } from "./visit-button"

interface FormDetailsProps {
  formId: string
}

export function FormDetails({ formId }: FormDetailsProps) {
  const { data: form, isLoading } = api.forms.getFormWithSubmissions.useQuery({
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
        <SubmissionsTable form={form} />
      </div>
    </div>
  )
}

type Row = Record<string, string> & {
  id: string
  submittedAt: Date
}

interface SubmissionsTableProps {
  form: RouterOutputs["forms"]["getFormWithSubmissions"]
}

function SubmissionsTable({ form }: SubmissionsTableProps) {
  const formElements = JSON.parse(
    form.content,
  ) as FormElementInstance<ElementType>[]
  const columns: {
    id: string
    label: string
    required: boolean
    type: ElementType
  }[] = []

  for (const el of formElements) {
    switch (el.type) {
      case "TextField":
      case "NumberField":
        columns.push({
          id: el.id,
          label: el.extraAttributes.label,
          required: el.extraAttributes.required ?? false,
          type: el.type,
        })
        break
      default:
        break
    }
  }

  const rows: Row[] = []
  for (const submission of form.formSubmissions) {
    const content = JSON.parse(submission.content)
    rows.push({
      ...content,
      id: submission.id,
      submittedAt: submission.createdAt,
    })
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Submissions</h1>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-accent text-accent-foreground">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.id}>{col.label}</TableHead>
              ))}
              <TableHead className="text-right">Submitted at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <RowCell key={col.id} type={col.type} value={row[col.id]} />
                ))}
                <TableCell className="text-right">
                  {formatDistance(row.submittedAt, Date.now(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

interface RowCellProps {
  type: ElementType
  value: string
}

function RowCell({ type: _type, value }: RowCellProps) {
  const node: React.ReactNode = value

  return <TableCell>{node}</TableCell>
}
