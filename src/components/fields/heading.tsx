import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { Heading1Icon } from "lucide-react"
import { useForm } from "react-hook-form"

import type {
  DesignerComponentProps,
  FormComponentProps,
  FormElement,
  HeadingAttributes,
  PropertiesComponentProps,
} from "@/lib/types"
import { HeadingAttributesSchema } from "@/lib/validation"
import { useDesigner } from "@/hooks/use-designer"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const HeadingElement: FormElement<"Heading"> = {
  type: "Heading",
  construct: (id: string) => ({
    id,
    type: "Heading",
    extraAttributes: {
      title: "Heading",
    },
  }),
  buttonComponent: {
    icon: Heading1Icon,
    label: "Heading",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
}

function DesignerComponent({ element }: DesignerComponentProps<"Heading">) {
  const { title } = element.extraAttributes

  return <h1 className="text-xl font-bold">{title}</h1>
}

function FormComponent({ element }: FormComponentProps<"Heading">) {
  const { title } = element.extraAttributes

  return <h1 className="text-xl font-bold">{title}</h1>
}

function PropertiesComponent({ element }: PropertiesComponentProps<"Heading">) {
  const { updateElement } = useDesigner()
  const form = useForm<HeadingAttributes>({
    mode: "onBlur",
    resolver: zodResolver(HeadingAttributesSchema),
    defaultValues: {
      ...element.extraAttributes,
    },
  })

  useEffect(() => form.reset(element.extraAttributes), [element, form])

  function applyChanges(values: HeadingAttributes) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onBlur={form.handleSubmit(applyChanges)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>The text of the heading.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
