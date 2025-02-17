import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { Heading2Icon } from "lucide-react"
import { useForm } from "react-hook-form"

import type {
  DesignerComponentProps,
  FormComponentProps,
  FormElement,
  PropertiesComponentProps,
  SubHeadingAttributes,
} from "@/lib/types"
import { SubHeadingAttributesSchema } from "@/lib/validation"
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

export const SubHeadingElement: FormElement<"SubHeading"> = {
  type: "SubHeading",
  construct: (id: string) => ({
    id,
    type: "SubHeading",
    extraAttributes: {
      title: "Sub Heading",
    },
  }),
  buttonComponent: {
    icon: Heading2Icon,
    label: "Sub Heading",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
}

function DesignerComponent({ element }: DesignerComponentProps<"SubHeading">) {
  const { title } = element.extraAttributes

  return <h2 className="text-lg font-bold">{title}</h2>
}

function FormComponent({ element }: FormComponentProps<"SubHeading">) {
  const { title } = element.extraAttributes

  return <h2 className="text-lg font-bold mt-3">{title}</h2>
}

function PropertiesComponent({
  element,
}: PropertiesComponentProps<"SubHeading">) {
  const { updateElement } = useDesigner()
  const form = useForm<SubHeadingAttributes>({
    mode: "onBlur",
    resolver: zodResolver(SubHeadingAttributesSchema),
    defaultValues: {
      ...element.extraAttributes,
    },
  })

  useEffect(() => form.reset(element.extraAttributes), [element, form])

  function applyChanges(values: SubHeadingAttributes) {
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
              <FormDescription>The text of the sub heading.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
