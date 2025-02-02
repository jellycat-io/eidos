import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface StatCardProps {
  title: string
  icon: LucideIcon
  description: string
  value: string
  shadowClass: string
  iconClass: string
  loading: boolean
}

export function StatCard({
  title,
  icon: Icon,
  description,
  value,
  shadowClass,
  iconClass,
  loading,
}: StatCardProps) {
  return (
    <Card className={cn("space-y-2 shadow-md", shadowClass)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Icon className={cn("size-8", iconClass)} />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {loading ? (
            <Skeleton className="h-9" />
          ) : (
            <span className="text-3xl font-bold">{value}</span>
          )}
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
