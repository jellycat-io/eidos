"use client"

import { Button } from "@/components/ui/button"

interface VisitButtonProps {
  shareUrl: string
}

export function VisitButton({ shareUrl }: VisitButtonProps) {
  const shareLink = `${window.location.origin}/submit/${shareUrl}`

  return (
    <Button
      className="w-[100px]"
      onClick={() => window.open(shareLink, "_blank")}
    >
      Visit
    </Button>
  )
}
