"use client"

import { useState } from "react"

import { CopyCheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FormLinkShareProps {
  shareUrl: string
}

export function FormLinkShare({ shareUrl }: FormLinkShareProps) {
  const [copied, setCopied] = useState(false)
  const shareLink = `${window.location.origin}/submit/${shareUrl}`

  function handleClick() {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-grow items-center gap-6">
      <Input readOnly value={shareLink} />
      <Button
        variant="outline"
        className="min-w-[100px]"
        disabled={copied}
        onClick={handleClick}
      >
        {copied ? <CopyCheckIcon /> : <CopyIcon />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  )
}
