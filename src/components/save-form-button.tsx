"use client"

import { api } from "@/trpc/react"
import { SaveIcon } from "lucide-react"

import { useDesigner } from "@/hooks/use-designer"
import { useToast } from "@/hooks/use-toast"

import { LoadingButton } from "./loading-button"

interface SaveFormButtonProps {
  formId: string
}

export function SaveFormButton({ formId }: SaveFormButtonProps) {
  const { elements } = useDesigner()
  const { toast } = useToast()

  const trpcUtils = api.useUtils()
  const saveForm = api.forms.saveForm.useMutation({
    onSuccess: () => {
      trpcUtils.forms.getForms.invalidate()
      trpcUtils.forms.getFormById.invalidate()
      toast({
        title: "Success",
        description: "Form saved successfully",
      })
    },
    onError: (e) => {
      console.error(e)
      toast({
        title: "Error",
        description: "Failed to save form.",
        variant: "destructive",
      })
    },
  })

  function handleClick() {
    saveForm.mutate({ id: formId, content: JSON.stringify(elements) })
  }

  return (
    <LoadingButton
      icon={SaveIcon}
      loading={saveForm.isPending}
      onClick={handleClick}
    >
      {saveForm.isPending ? "Saving..." : "Save"}
    </LoadingButton>
  )
}
