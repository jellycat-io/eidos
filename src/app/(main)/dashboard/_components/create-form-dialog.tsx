"use client"

import { useState } from "react"

import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, SaveIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { createFormSchema, type CreateFormValues } from "@/lib/types"
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
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const trpcUtils = api.useUtils()
  const createForm = api.form.createForm.useMutation({
    onError: (e) => {
      console.error(e)
      toast({
        variant: "destructive",
        description: "Failed to create form.",
      })
    },
    onSuccess: () => {
      trpcUtils.form.getFormSummaries.invalidate()
      setOpen(false)
    },
  })

  function handleSubmit(values: CreateFormValues) {
    createForm.mutate(values)
  }

  const loading = createForm.isPending

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <PlusIcon />
          Create new form
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
                    <Input {...field} disabled={loading} />
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
                    <Textarea {...field} rows={5} disabled={loading} />
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
