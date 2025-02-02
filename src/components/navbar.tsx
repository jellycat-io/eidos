"use client"

import Link from "next/link"

import { useUser } from "@clerk/nextjs"

import { Logo } from "./logo"
import { ThemeSwitcher } from "./theme-switcher"
import { UserButton } from "./user-button"

export function Navbar() {
  const user = useUser()
  return (
    <header className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
      <aside className="flex items-center">
        <Logo />
      </aside>
      <aside className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-1 focus:ring-slate-400"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#a5b4fc_50%,#3b82f6_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {user.isSignedIn ? "Dashboard" : "Get Started"}
          </span>
        </Link>
        <ThemeSwitcher />
        <UserButton />
      </aside>
    </header>
  )
}
