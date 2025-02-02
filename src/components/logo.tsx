import { Offside } from "next/font/google"
import Link from "next/link"

const copseSans = Offside({
  subsets: ["latin"],
  weight: "400",
})

export function Logo() {
  return (
    <Link href="/">
      <span
        className={`${copseSans.className} bg-gradient-to-r from-indigo-300 to-blue-500 bg-clip-text text-transparent text-4xl`}
      >
        Eidos
      </span>
    </Link>
  )
}
