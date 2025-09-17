export type UserRole = "student" | "faculty" | "admin" | "parent"
export type AdminSubRole = "financial" | "academic" | "hostel" | "library"
export type FacultySubRole = "hod" | "assistant_hod" | "professor"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  adminSubRole?: AdminSubRole
  FacultySubRole?: FacultySubRole
  avatar?: string
}
