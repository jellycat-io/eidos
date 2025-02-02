import { Suspense } from "react"

import { Separator } from "@/components/ui/separator"

import { CreateFormDialog } from "./_components/create-form-dialog"
import { FormsList } from "./_components/forms-list"
import { StatsCards } from "./_components/stats-cards"

export default function DashboardPage() {
  return (
    <div className="w-full p-8 flex flex-col gap-8">
      <Suspense fallback={<StatsCards loading />}>
        <StatsCards />
      </Suspense>
      <Separator />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <FormsList />
      <Separator />
      <CreateFormDialog />
    </div>
  )
}
