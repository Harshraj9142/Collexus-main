export type UserRole = "student" | "faculty" | "admin" | "parent"
export type AdminSubRole = "financial" | "academic" | "hostel" | "library"
export type FacultySubRole = "HOD" | "Assistant HOD" | "Professor"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  adminSubRole?: AdminSubRole
  FacultySubRole?: FacultySubRole
  avatar?: string
}
