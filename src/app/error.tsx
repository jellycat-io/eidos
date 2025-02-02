"use client"

import { useEffect } from "react"
import Link from "next/link"

import { BombIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6">
      <BombIcon className="size-24 text-destructive animate-pulse" />
      <span className="text-2xl font-bold text-destructive">
        Oops, something went wrong.
      </span>
      <Button variant="outline" asChild>
        <Link href="/dashboard">Go back</Link>
      </Button>
    </div>
  )
}
