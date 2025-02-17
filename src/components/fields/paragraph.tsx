import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { LetterTextIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import type {
  DesignerComponentProps,
  FormComponentProps,
  FormElement,
  ParagraphAttributes,
  PropertiesComponentProps,
} from "@/lib/types"
import { ParagraphAttributesSchema } from "@/lib/validation"
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
import { Textarea } from "@/components/ui/textarea"

export const ParagraphElement: FormElement<"Paragraph"> = {
  type: "Paragraph",
  construct: (id: string) => ({
    id,
    type: "Paragraph",
    extraAttributes: {
      text: "Lorem ipsum dolor sit amet.",
    },
  }),
  buttonComponent: {
    icon: LetterTextIcon,
    label: "Paragraph",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
}

function DesignerComponent({ element }: DesignerComponentProps<"Paragraph">) {
  const { text } = element.extraAttributes

  return <p className="text-sm">{text}</p>
}

function FormComponent({ element }: FormComponentProps<"Paragraph">) {
  const { text } = element.extraAttributes

  return <p className="text-sm my-2">{text}</p>
}

function PropertiesComponent({
  element,
}: PropertiesComponentProps<"Paragraph">) {
  const { updateElement } = useDesigner()
  const form = useForm<ParagraphAttributes>({
    mode: "onBlur",
    resolver: zodResolver(ParagraphAttributesSchema),
    defaultValues: {
      ...element.extraAttributes,
    },
  })

  useEffect(() => form.reset(element.extraAttributes), [element, form])

  function applyChanges(values: ParagraphAttributes) {
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                  rows={5}
                />
              </FormControl>
              <FormDescription>The text of the paragraph.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
