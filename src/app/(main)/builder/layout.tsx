import { DesignerProvider } from "@/providers/designer-provider"

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DesignerProvider>{children}</DesignerProvider>
}
