"use client"

import { api } from "@/trpc/react"
import {
  EyeIcon,
  MousePointerClickIcon,
  TrendingUpIcon,
  VolleyballIcon,
} from "lucide-react"

import { StatCard } from "./stat-card"

interface StatsCardsProps {
  loading?: boolean
}

export function StatsCards({ loading = false }: StatsCardsProps) {
  const { data: stats, isLoading: isLoadingStats } =
    api.form.getFormStats.useQuery()

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard
        title="Total visits"
        icon={EyeIcon}
        description="All time form visits"
        value={stats?.visits.toLocaleString() ?? ""}
        loading={loading || isLoadingStats}
        shadowClass="shadow-blue-600"
        iconClass="text-blue-600"
      />
      <StatCard
        title="Total submissions"
        icon={MousePointerClickIcon}
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
        value={`${stats?.submissionRate.toLocaleString() ?? ""}%`}
        loading={loading || isLoadingStats}
        shadowClass="shadow-green-600"
        iconClass="text-green-600"
      />
      <StatCard
        title="Bounce rate"
        icon={VolleyballIcon}
        description="Visits left without interaction"
        value={`${stats?.bounceRate.toLocaleString() ?? ""}%`}
        loading={loading || isLoadingStats}
        shadowClass="shadow-red-600"
        iconClass="text-red-600"
      />
    </section>
  )
}
