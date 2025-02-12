import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { MdTextFields } from "react-icons/md"
import { z, ZodError } from "zod"

import {
  FormComponentProps,
  FormElementInstance,
  type DesignerComponentProps,
  type ElementType,
  type FormElement,
  type PropertiesComponentProps,
} from "@/lib/types"
import { cn } from "@/lib/utils"
import { optionalString, requiredString } from "@/lib/validation"
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export const TextFieldFormElement: FormElement<"TextField"> = {
  type: "TextField",
  construct: (id: string) => ({
    id,
    type: "TextField",
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
    },
  }),
  buttonComponent: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (element, value) => {
    try {
      z.string()
        .refine(
          (val) => !element.extraAttributes.required || val.trim().length > 0,
          { message: "Required" },
        )
        .parse(value)
      return null
    } catch (e) {
      if (e instanceof ZodError) {
        return e.errors.map((e) => e.message).join(", ")
      }

      return "Error"
    }
  },
}

function DesignerComponent<T extends ElementType>({
  element,
}: DesignerComponentProps<T>) {
  const { label, placeholder, required, helperText } = element.extraAttributes

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label>
        {label}
        {required && " *"}
      </Label>
      <Input readOnly placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-xs">{helperText}</p>
      )}
    </div>
  )
}

function FormComponent<T extends ElementType>({
  element,
  defaultValue,
  onChange,
  error: formError,
}: FormComponentProps<T>) {
  const { label, placeholder, required, helperText } = element.extraAttributes
  const [value, setValue] = useState(defaultValue || "")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => setError(formError ?? null), [formError])

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label className={cn(!!error && "text-destructive")}>
        {label}
        {required && " *"}
      </Label>
      <Input
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!onChange) return
          onChange(element.id, e.target.value)

          const error = TextFieldFormElement.validate(
            element as FormElementInstance<"TextField">,
            e.target.value,
          )
          setError(error)
        }}
        value={value}
        className={cn(!!error && "border-destructive")}
      />
      {error && <p className="text-destructive text-xs">{error}</p>}
      {!error && helperText && (
        <p className="text-muted-foreground text-xs">{helperText}</p>
      )}
    </div>
  )
}

const propertiesFormSchema = z.object({
  label: requiredString,
  helperText: optionalString,
  required: z.boolean().default(false).optional(),
  placeholder: optionalString,
})

type PropertiesFormValues = z.infer<typeof propertiesFormSchema>

function PropertiesComponent<T extends ElementType>({
  element,
}: PropertiesComponentProps<T>) {
  const { updateElement } = useDesigner()
  const form = useForm<PropertiesFormValues>({
    mode: "onBlur",
    resolver: zodResolver(propertiesFormSchema),
    defaultValues: {
      ...element.extraAttributes,
    },
  })

  useEffect(() => form.reset(element.extraAttributes), [element, form])

  function applyChanges(values: PropertiesFormValues) {
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. It will be displayed above the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>The placeholder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper text of the field. It will be displayed below the
                field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg gap-2 border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  Whether or not this field required.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onKeyDown={(e) => {
                    if (e.key === "Space") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
