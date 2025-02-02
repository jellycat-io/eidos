import { FormBuilder } from "./_components/form-builder"

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <FormBuilder formId={id} />
}
