"use client"

import { useState } from "react"
import { Bell, Menu, LogOut, User, Settings, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useSession, signOut } from "next-auth/react"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavbarProps {
  onMenuClickAction: () => void
}

export function Navbar({ onMenuClickAction }: NavbarProps) {
  const { data: session } = useSession()

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/auth-pg" })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getRoleColor = (role: string) => {
    const colors = {
      student: "bg-blue-500",
      faculty: "bg-green-500",
      admin: "bg-purple-500",
      parent: "bg-orange-500",
    }
    return colors[role as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <header className="sticky top-0 z-50 w-full h-fit pb-2 bg-gray-50 shadow-md">

      <div className="flex h-fit pt-2 pb-0 items-center px-4 gap-4 max-w-7xl mx-auto">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClickAction}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg p-2 flex items-center justify-center">
            {/* <span className="text-primary-foreground font-bold text-sm">CE</span> */}
            <GraduationCap className="text-primary-foreground font-bold text-3xl"/>
          </div>
          <span className="font-bold text-2xl pl-1 hidden sm:block">
            College ERP
          </span>
        </div>

        {/* Push right side actions to end (only desktop) */}
        <div className="flex-1" /> {/* Spacer */}

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </Button>

          {/* Profile dropdown */}
          {session?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={session.user.avatar || "/placeholder.svg"}
                      alt={session.user.name || ""}
                    />
                    <AvatarFallback
                      className={getRoleColor(session.user.role || "")}
                    >
                      {getInitials(session.user.name || "")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                    <Badge
                      variant="secondary"
                      className="w-fit mt-1 capitalize"
                    >
                      {session.user.role}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
