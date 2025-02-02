import { ScanEyeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

export function PreviewDialogButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ScanEyeIcon />
          Preview
        </Button>
      </DialogTrigger>
    </Dialog>
  )
}
