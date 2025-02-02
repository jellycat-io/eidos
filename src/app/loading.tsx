import { LoaderCircleIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <LoaderCircleIcon className="size-12 shrink-0 text-accent animate-spin" />
    </div>
  )
}
