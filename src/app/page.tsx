import { HeroHighlight } from "@/components/ui/hero-highlight"

import { Clock } from "./_components/clock"

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center text-center">
      <HeroHighlight>
        <h1 className="text-4xl font-bold mb-6">Hello, World! 👋</h1>
        <Clock />
      </HeroHighlight>
    </main>
  )
}
