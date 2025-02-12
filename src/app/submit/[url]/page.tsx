import Link from "next/link"

import { auth } from "@clerk/nextjs/server"

import { ThemeSwitcher } from "@/components/theme-switcher"

import { SubmitForm } from "./_components/submit-form"

interface SubmitPageProps {
  params: Promise<{ url: string }>
}

export default async function SubmitPage({ params }: SubmitPageProps) {
  const user = await auth()

  const { url } = await params
  return (
    <div className="relative min-h-screen w-full max-w-[1920px] flex items-center justify-center gap-8 p-8 bg-dot-slate-300 dark:bg-dot-slate-800">
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-1 focus:ring-slate-400"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#a5b4fc_50%,#3b82f6_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background hover:bg-transparent transition-colors duration-200 px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
            {user ? "Dashboard" : "Get Started"}
          </span>
        </Link>
        <ThemeSwitcher />
      </div>
      <SubmitForm formUrl={url} />
    </div>
  )
}
