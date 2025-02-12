"use client"

import { useCallback, useRef, useState } from "react"

import { api } from "@/trpc/react"
import { MousePointerClickIcon } from "lucide-react"

import { FORM_ELEMENTS } from "@/lib/constants"
import type { FormComponentProps } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Loader } from "@/components/loader"
import { LoadingButton } from "@/components/loading-button"

interface SubmitFormProps {
  formUrl: string
}

export function SubmitForm({ formUrl }: SubmitFormProps) {
  const { data: formData, isLoading } = api.forms.getFormByUrl.useQuery({
    url: formUrl,
  })

  const submitForm = api.forms.submitForm.useMutation({
    onSuccess: () => {
      setSubmitted(true)
    },
    onError: (e) => {
      console.error(e)
      toast({
        title: "Error",
        description: "Failed to submit the form.",
        variant: "destructive",
      })
    },
  })

  const { toast } = useToast()

  const formValues = useRef<{ [key: string]: string }>({})
  const formErrors = useRef<{ [key: string]: string | null }>({})
  const [renderKey, setRenderKey] = useState(new Date().getTime())
  const [submitted, setSubmitted] = useState(false)

  function onChange(key: string, value: string) {
    formValues.current[key] = value
  }

  const validateForm: () => boolean = useCallback(() => {
    if (!formData) return false
    for (const field of formData?.elements) {
      const value = formValues.current[field.id]
      const err = FORM_ELEMENTS[field.type].validate(field, value)
      if (err) {
        formErrors.current[field.id] = err
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false
    }

    return true
  }, [formData])

  function handleSubmit() {
    formErrors.current = {}
    const isValid = validateForm()
    if (!isValid) {
      setRenderKey(new Date().getTime())
      toast({
        title: "Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      })
      return
    }

    const jsonContent = JSON.stringify(formValues.current)
    submitForm.mutate({ shareUrl: formUrl, content: jsonContent })
  }

  function handleCancel() {
    formValues.current = {}
    formErrors.current = {}
    setRenderKey(new Date().getTime())
  }

  if (!formData || isLoading) {
    return <Loader />
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-[620px]">
        <CardContent className="pt-6 space-y-6">
          <h1 className="text-2xl font-bold">Form submitted!</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form. You can now close this page.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => {
              window.opener = null
              window.open("", "_self")
              window.close()
            }}
          >
            Close
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-[620px] overflow-y-auto">
      <CardContent key={renderKey} className="pt-6 space-y-6">
        {formData.elements.map((el) => {
          const FormComponent = FORM_ELEMENTS[el.type]
            .formComponent as React.FC<FormComponentProps<typeof el.type>>
          return (
            <FormComponent
              key={el.id}
              element={el}
              defaultValue={formValues.current[el.id]}
              onChange={onChange}
              error={formErrors.current[el.id]}
            />
          )
        })}
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button type="reset" variant="ghost" onClick={handleCancel}>
          Cancel
        </Button>
        <LoadingButton
          loading={submitForm.isPending}
          icon={MousePointerClickIcon}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </CardFooter>
    </Card>
  )
}
