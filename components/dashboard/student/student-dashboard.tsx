"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Bell, TrendingUp, DollarSign, Home, UserCheck, BookOpen, Calendar, AlertCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { getCurrentUserClient } from "@/lib/auth-client"

// Mock data for student dashboard
const mockStudentData = {
  gpa: 3.75,
  feesPercentage: 85,
  hostelRoom: "Block A - Room 204",
  attendancePercentage: 92,
  gpaHistory: [
    { semester: "Sem 1", gpa: 3.2 },
    { semester: "Sem 2", gpa: 3.4 },
    { semester: "Sem 3", gpa: 3.6 },
    { semester: "Sem 4", gpa: 3.7 },
    { semester: "Sem 5", gpa: 3.75 },
  ],
  subjectAttendance: [
    { subject: "Mathematics", attendance: 95 },
    { subject: "Physics", attendance: 88 },
    { subject: "Chemistry", attendance: 92 },
    { subject: "Computer Science", attendance: 97 },
    { subject: "English", attendance: 85 },
  ],
  notifications: [
    {
      id: 1,
      title: "Assignment Due",
      message: "Mathematics assignment due tomorrow",
      type: "warning",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Fee Payment",
      message: "Semester fee payment reminder",
      type: "info",
      time: "1 day ago",
    },
    {
      id: 3,
      title: "Exam Schedule",
      message: "Mid-term exam schedule released",
      type: "success",
      time: "2 days ago",
    },
  ],
  upcomingEvents: [
    { title: "Mathematics Quiz", date: "Tomorrow, 10:00 AM" },
    { title: "Physics Lab", date: "Friday, 2:00 PM" },
    { title: "Chemistry Assignment Due", date: "Monday, 11:59 PM" },
  ],
}

export function StudentDashboard() {
  const user = getCurrentUserClient()

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600"
    if (gpa >= 3.0) return "text-yellow-600"
    return "text-red-600"
  }

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 75) return "bg-yellow-500"
    return "bg-red-500"
  }


  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground text-pretty">
          Here&apos;s an overview of your academic progress and upcoming activities.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getGpaColor(mockStudentData.gpa)}`}>
              {mockStudentData.gpa.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Out of 4.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fees Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudentData.feesPercentage}%</div>
            <Progress value={mockStudentData.feesPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              ${(mockStudentData.feesPercentage * 50).toLocaleString()} of $5,000 paid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hostel Room</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudentData.hostelRoom}</div>
            <Badge variant="secondary" className="mt-2">
              Active
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudentData.attendancePercentage}%</div>
            <Progress
              value={mockStudentData.attendancePercentage}
              className="mt-2"
              // @ts-expect-error - Custom indicator class not in types
              indicatorClassName={getAttendanceColor(mockStudentData.attendancePercentage)}
            />
            <p className="text-xs text-muted-foreground mt-1">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>GPA Trend</CardTitle>
            <CardDescription>Your GPA progression over semesters</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockStudentData.gpaHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis domain={[0, 4]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="gpa"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance by Subject</CardTitle>
            <CardDescription>Current semester attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockStudentData.subjectAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="attendance" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Notifications and Upcoming Events */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudentData.notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 mt-1">
                    {notification.type === "warning" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                    {notification.type === "info" && <Bell className="h-4 w-4 text-blue-500" />}
                    {notification.type === "success" && <UserCheck className="h-4 w-4 text-green-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Notifications
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudentData.upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start gap-2 bg-transparent">
              <BookOpen className="h-4 w-4" />
              View Courses
            </Button>
            <Button variant="outline" className="justify-start gap-2 bg-transparent">
              <UserCheck className="h-4 w-4" />
              Check Attendance
            </Button>
            <Button variant="outline" className="justify-start gap-2 bg-transparent">
              <DollarSign className="h-4 w-4" />
              Pay Fees
            </Button>
            <Button variant="outline" className="justify-start gap-2 bg-transparent">
              <Calendar className="h-4 w-4" />
              View Timetable
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
