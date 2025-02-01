import { Offside } from "next/font/google"

const copseSans = Offside({
  subsets: ["latin"],
  weight: "400",
})

export function Logo() {
  return (
    <span
      className={`${copseSans.className} bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent text-4xl`}
    >
      Eidos
    </span>
  )
}
