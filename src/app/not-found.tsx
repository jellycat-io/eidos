import Link from "next/link"

import { CakeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6">
      <CakeIcon className="size-24 text-muted-foreground" />
      <span className="text-2xl font-bold">This page is a lie.</span>
      <Button variant="outline" asChild>
        <Link href="/dashboard">Go back</Link>
      </Button>
    </div>
  )
}
