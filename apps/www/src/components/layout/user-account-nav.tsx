"use client"

import type { User } from "next-auth"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@propdock/ui/components/dropdown-menu"
import {
  Book,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react"
import { signOut } from "next-auth/react"

import { UserAvatar } from "@/components/shared/user-avatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <LayoutDashboard className="h-4 w-4" />
            <p className="text-sm">Dashboard</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/help" className="flex items-center space-x-2.5">
            <Book className="h-4 w-4" />
            <p className="text-sm">Hjelp</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/billing"
            className="flex items-center space-x-2.5"
          >
            <CreditCard className="h-4 w-4" />
            <p className="text-sm">Betaling</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center space-x-2.5">
            <Settings className="h-4 w-4" />
            <p className="text-sm">Innstillinger</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/`,
            })
          }}
        >
          <div className="flex items-center space-x-2.5">
            <LogOut className="h-4 w-4" />
            <p className="text-sm">Logg ut</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
