"use client"

import { ScanEyeIcon } from "lucide-react"

import { FORM_ELEMENTS } from "@/lib/constants"
import { FormComponentProps } from "@/lib/types"
import { useDesigner } from "@/hooks/use-designer"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function PreviewDialogButton() {
  const { elements } = useDesigner()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ScanEyeIcon />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <DialogTitle className="text-lg font-bold text-muted-foreground">
            Form preview
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            This is how you form will look like to your users.
          </DialogDescription>
        </div>
        <div className="relative flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-secondary bg-dot-slate-600" />
          <div className="w-full max-w-3xl flex flex-col flex-grow gap-4 bg-background rounded-xl p-6 overflow-y-auto z-10">
            {elements.map((el) => {
              const FormComponent = FORM_ELEMENTS[el.type]
                .formComponent as React.FC<FormComponentProps<typeof el.type>>

              return <FormComponent key={el.id} element={el} />
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
