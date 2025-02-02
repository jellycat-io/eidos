"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useClerk,
} from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { CreditCardIcon, LogInIcon, LogOutIcon, UserIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

export function UserButton() {
  const { user, session, openUserProfile } = useClerk()
  const { resolvedTheme } = useTheme()
  const router = useRouter()

  const isDark = resolvedTheme === "dark"

  return (
    <>
      <ClerkLoading>
        <Skeleton className="size-9" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignInButton>
            <Button variant="outline" size="icon">
              <LogInIcon className="size-4" />
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full overflow-hidden"
              >
                {user?.imageUrl ? (
                  <Image
                    src={user?.imageUrl}
                    alt="profile picture"
                    width={64}
                    height={64}
                  />
                ) : (
                  <UserIcon className="size-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    openUserProfile({
                      appearance: { baseTheme: isDark ? dark : undefined },
                    })
                  }
                >
                  <UserIcon className="size-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/billing")}>
                  <CreditCardIcon className="size-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <SignOutButton signOutOptions={{ sessionId: session?.id }}>
                  <DropdownMenuItem>
                    <LogOutIcon className="size-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </SignOutButton>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </ClerkLoaded>
    </>
  )
}
