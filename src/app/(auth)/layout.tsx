import { HeroHighlight } from "@/components/ui/hero-highlight"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <HeroHighlight className="min-h-screen">{children}</HeroHighlight>
}
