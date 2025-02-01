import { HeroHighlight } from "@/components/ui/hero-highlight"
import { ThemeSwitcher } from "@/components/theme-switcher"

import { Clock } from "./_components/clock"

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center text-center">
      <div className="absolute z-[10] top-4 right-4">
        <ThemeSwitcher />
      </div>
      <HeroHighlight>
        <h1 className="text-4xl font-bold mb-6">Hello, World! 👋</h1>
        <Clock />
      </HeroHighlight>
    </main>
  )
}
