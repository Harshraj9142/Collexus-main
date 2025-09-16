import { DefaultSession } from "next-auth"
import { UserRole, AdminSubRole } from "@/lib/types"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      adminSubRole?: AdminSubRole
      avatar?: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: UserRole
    adminSubRole?: AdminSubRole
    avatar?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
    adminSubRole?: AdminSubRole
    avatar?: string
  }
}




