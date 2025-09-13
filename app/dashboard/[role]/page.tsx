import { redirect } from "next/navigation"
import { StudentDashboard } from "@/components/dashboard/student/student-dashboard"
import { FacultyDashboard } from "@/components/dashboard/faculty/faculty-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard"
import { ParentDashboard } from "@/components/dashboard/parent/parent-dashboard"

interface DashboardPageProps {
  params: Promise<{
    role: string
  }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { role } = await params

  // Validate role
  const validRoles = ["student", "faculty", "admin", "parent"]
  if (!validRoles.includes(role)) {
    redirect("/")
  }

  switch (role) {
    case "student":
      return <StudentDashboard />
    case "faculty":
      return <FacultyDashboard />
    case "admin":
      return <AdminDashboard />
    case "parent":
      return <ParentDashboard />
    default:
      redirect("/")
  }
}
