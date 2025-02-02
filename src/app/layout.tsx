import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

import { ClerkProvider } from "@clerk/nextjs"

import "./globals.css"

import { ThemeProvider } from "@/providers/theme-provider"
import { TRPCReactProvider } from "@/trpc/react"

import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"

const fontSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next template",
  description: "Let's start building",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${fontSans.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <div className="flex flex-col min-h-screen min-w-full bg-background max-w-screen">
                <Navbar />
                <main className="flex w-full flex-grow">{children}</main>
              </div>
              <Toaster />
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
