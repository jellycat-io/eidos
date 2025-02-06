"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FilePlus2Icon, SaveIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { createFormSchema, type CreateFormValues } from "@/lib/validation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LoadingButton } from "@/components/loading-button"

export function CreateFormDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const trpcUtils = api.useUtils()
  const createForm = api.forms.createForm.useMutation({
    onError: (e) => {
      console.error(e)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create form.",
      })
    },
    onSuccess: ({ formId }) => {
      toast({
        title: "Success",
        description: "Form created successfully.",
      })
      trpcUtils.forms.getForms.invalidate()
      setOpen(false)
      router.push(`/builder/${formId}`)
    },
  })

  function handleSubmit(values: CreateFormValues) {
    createForm.mutate(values)
  }

  const loading = createForm.isPending

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group bg-background border border-primary/20 h-[212px] flex flex-col items-center justify-center gap-4 hover:border-primary hover:cursor-pointer border-dashed [&_svg]:size-8"
        >
          <FilePlus2Icon className="text-muted-foreground group-hover:text-primary" />
          <span className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create new form
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new form</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="My precious"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={5}
                      disabled={loading}
                      placeholder="A form to fill them all and in the darkness submit them"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => form.reset({ title: "", description: "" })}
              >
                Cancel
              </Button>
              <LoadingButton type="submit" icon={SaveIcon} loading={loading}>
                {loading ? "Saving..." : "Save"}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
