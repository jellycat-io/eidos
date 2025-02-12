import { Navbar } from "@/components/navbar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen w-full mx-auto max-w-[1920px] bg-background">
      <Navbar />
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  )
}
