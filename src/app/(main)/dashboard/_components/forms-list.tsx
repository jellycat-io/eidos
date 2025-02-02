"use client"

import Link from "next/link"

import { api, RouterOutputs } from "@/trpc/react"
import { formatDistance } from "date-fns"
import { PencilLineIcon, SendIcon, ViewIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { CreateFormDialog } from "./create-form-dialog"

export function FormsList() {
  const { data: forms, isLoading } = api.forms.getForms.useQuery()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CreateFormDialog />
      {isLoading ? (
        <>
          {Array.from({ length: 2 }, (_, i) => (
            <FormCardSkeleton key={i} />
          ))}
        </>
      ) : (
        <>{forms?.map((form) => <FormCard key={form.id} form={form} />)}</>
      )}
    </div>
  )
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[212px] w-full" />
}

interface FormCardProps {
  form: RouterOutputs["forms"]["getForms"][number]
}

function FormCard({ form }: FormCardProps) {
  return (
    <Card className="min-h-[212px] hover:border-primary transition-colors duration-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-6">
          <span className="truncate text-xl">{form.title}</span>
          <Badge
            className={cn(
              "rounded-full",
              form.published
                ? "bg-green-500 animate-[pulse_2s_linear_infinite]"
                : "bg-yellow-500",
            )}
          >
            {form.published ? "Published" : "Draft"}
          </Badge>
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm [&_svg]:size-4">
          {formatDistance(form.updatedAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <div className="flex items-center gap-2">
              <ViewIcon />
              <span>{form.visits.toLocaleString()}</span>
              <SendIcon />
              <span>{form.submissions.toLocaleString()}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description?.length ? form.description : "No description"}
      </CardContent>
      <CardFooter className="mt-6">
        {form.published ? (
          <Button variant="secondary" className="w-full" asChild>
            <Link href={`/forms/${form.id}`}>
              <SendIcon />
              View submissions
            </Link>
          </Button>
        ) : (
          <Button variant="secondary" className="w-full" asChild>
            <Link href={`/builder/${form.id}`}>
              <PencilLineIcon />
              Edit
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
