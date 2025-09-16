export type UserRole = "student" | "faculty" | "admin" | "parent"
export type AdminSubRole = "financial" | "academic" | "hostel"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  adminSubRole?: AdminSubRole
  avatar?: string
}






