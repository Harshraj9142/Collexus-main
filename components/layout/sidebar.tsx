"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getCurrentUserClient as getCurrentUser } from "@/lib/auth-client"
import type { UserRole } from "@/lib/types"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Calendar,
  FileText,
  Settings,
  GraduationCap,
  ClipboardList,
  BarChart3,
  DollarSign,
  Home,
  UserCheck,
  Bell,
  CreditCard,
  Building,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: UserRole[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["student", "faculty", "admin", "parent"],
  },
  // Student specific
  {
    title: "My Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
    roles: ["student"],
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: UserCheck,
    roles: ["student"],
  },
  {
    title: "Grades",
    href: "/dashboard/grades",
    icon: FileText,
    roles: ["student"],
  },
  {
    title: "Fees",
    href: "/dashboard/fees",
    icon: CreditCard,
    roles: ["student"],
  },
  {
    title: "Hostel",
    href: "/dashboard/hostel",
    icon: Building,
    roles: ["student"],
  },
  // Faculty specific
  {
    title: "My Classes",
    href: "/dashboard/classes",
    icon: GraduationCap,
    roles: ["faculty"],
  },
  {
    title: "Timetable",
    href: "/dashboard/timetable",
    icon: Calendar,
    roles: ["faculty"],
  },
  {
    title: "Mark Attendance",
    href: "/dashboard/mark-attendance",
    icon: ClipboardList,
    roles: ["faculty"],
  },
  {
    title: "Upload Marks",
    href: "/dashboard/upload-marks",
    icon: BarChart3,
    roles: ["faculty"],
  },
  // Admin specific
  {
    title: "Students",
    href: "/dashboard/students",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Faculty",
    href: "/dashboard/faculty",
    icon: GraduationCap,
    roles: ["admin"],
  },
  {
    title: "Admissions",
    href: "/dashboard/admissions",
    icon: FileText,
    roles: ["admin"],
  },
  {
    title: "Fee Management",
    href: "/dashboard/fee-management",
    icon: DollarSign,
    roles: ["admin"],
  },
  {
    title: "Hostel Management",
    href: "/dashboard/hostel-management",
    icon: Building,
    roles: ["admin"],
  },
  // Parent specific
  {
    title: "Child's Progress",
    href: "/dashboard/child-progress",
    icon: BarChart3,
    roles: ["parent"],
  },
  {
    title: "Attendance Report",
    href: "/dashboard/attendance-report",
    icon: UserCheck,
    roles: ["parent"],
  },
  {
    title: "Fee Status",
    href: "/dashboard/fee-status",
    icon: CreditCard,
    roles: ["parent"],
  },
  {
    title: "Notices",
    href: "/dashboard/notices",
    icon: Bell,
    roles: ["parent"],
  },
  // Common
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["student", "faculty", "admin", "parent"],
  },
]

export function Sidebar({ className, isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()
  const user = getCurrentUser()

  if (!user) return null

  const filteredNavItems = navItems.filter((item) => item.roles.includes(user.role))

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === `/dashboard/${user.role}`
    }
    return pathname?.startsWith(href) || false
  }

  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col border-r bg-sidebar transition-all duration-300",
        !isOpen && "w-0 overflow-hidden md:w-16",
        className,
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <div className={cn("flex items-center gap-2", !isOpen && "md:justify-center")}>
          <div className="h-8 w-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Home className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {isOpen && <span className="font-semibold text-sidebar-foreground">Navigation</span>}
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {filteredNavItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            const href = item.href === "/dashboard" ? `/dashboard/${user.role}` : item.href

            return (
              <Link key={item.href} href={href} onClick={onClose}>
                <Button
                  variant={active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    active && "bg-sidebar-accent text-sidebar-accent-foreground",
                    !isOpen && "md:justify-center md:px-2",
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {isOpen && <span className="truncate">{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}
