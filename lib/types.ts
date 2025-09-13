export type UserRole = "student" | "faculty" | "admin" | "parent"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}






