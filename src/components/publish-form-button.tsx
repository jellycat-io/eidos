"use client"

import { useRouter } from "next/navigation"

import { api } from "@/trpc/react"
import { RssIcon } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { LoadingButton } from "./loading-button"

interface PublishFormButtonProps {
  formId: string
}

export function PublishFormButton({ formId }: PublishFormButtonProps) {
  const { toast } = useToast()
  const router = useRouter()

  const trpcUtils = api.useUtils()
  const publishForm = api.forms.publishForm.useMutation({
    onSuccess: () => {
      trpcUtils.forms.getFormById.invalidate()
      trpcUtils.forms.getForms.invalidate()
      router.refresh()
    },
    onError: (e) => {
      console.error(e)
      toast({
        title: "Error",
        description: "Failed to publish form.",
        variant: "destructive",
      })
    },
  })

  function handleClick() {
    publishForm.mutate({ id: formId })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-gradient-to-r from-indigo-300 to-blue-500 text-white font-semibold">
          <RssIcon />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible. You will not be able to edit this form
            after publishing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton
              icon={RssIcon}
              loading={publishForm.isPending}
              onClick={handleClick}
            >
              {publishForm.isPending ? "Publishing..." : "Publish"}
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
