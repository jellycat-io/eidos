import { RssIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PublishFormButton() {
  return (
    <Button className="bg-gradient-to-r from-indigo-300 to-blue-500 text-white font-semibold">
      <RssIcon />
      Publish
    </Button>
  )
}
