import { FormDetails } from "./_components/form-details"

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <FormDetails formId={id} />
}
