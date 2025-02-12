import { api } from "@/trpc/react"
import { GhostIcon, SendIcon, TrendingUpIcon, ViewIcon } from "lucide-react"

import { StatCard } from "@/app/(main)/dashboard/_components/stat-card"

interface FormStatCardsProps {
  formId: string
  loading: boolean
}

export function FormStatCards({ formId, loading }: FormStatCardsProps) {
  const { data: stats, isLoading: isLoadingStats } =
    api.forms.getSingleFormStats.useQuery({ id: formId })

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard
        title="Total visits"
        icon={ViewIcon}
        description="All time form visits"
        value={stats?.visits.toLocaleString() ?? ""}
        loading={loading || isLoadingStats}
        shadowClass="shadow-blue-600"
        iconClass="text-blue-600"
      />
      <StatCard
        title="Total submissions"
        icon={SendIcon}
        description="All time form submissions"
        value={stats?.submissions.toLocaleString() ?? ""}
        loading={loading || isLoadingStats}
        shadowClass="shadow-yellow-600"
        iconClass="text-yellow-600"
      />
      <StatCard
        title="Submission rate"
        icon={TrendingUpIcon}
        description="Rate of submissions after visits"
        value={`${stats?.submissionRate.toLocaleString()}%`}
        loading={loading || isLoadingStats}
        shadowClass="shadow-green-600"
        iconClass="text-green-600"
      />
      <StatCard
        title="Bounce rate"
        icon={GhostIcon}
        description="Visits left without interaction"
        value={`${stats?.bounceRate.toLocaleString()}%`}
        loading={loading || isLoadingStats}
        shadowClass="shadow-red-600"
        iconClass="text-red-600"
      />
    </section>
  )
}
