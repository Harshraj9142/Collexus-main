"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  UserCheck,
  DollarSign,
  FileText,
  Bell,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  BookOpen,
  Award,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { getCurrentUserClient as getCurrentUser } from "@/lib/auth-client"

// Mock data for parent dashboard
const mockParentData = {
  child: {
    name: "Alex Johnson",
    studentId: "CS2024001",
    class: "CS-A",
    semester: "5th Semester",
    rollNumber: "21CS001",
  },
  attendance: {
    overall: 92,
    thisMonth: 88,
    subjects: [
      { subject: "Mathematics", percentage: 95, classes: 20, attended: 19 },
      { subject: "Data Structures", percentage: 90, classes: 18, attended: 16 },
      { subject: "Computer Networks", percentage: 88, classes: 16, attended: 14 },
      { subject: "Database Systems", percentage: 94, classes: 17, attended: 16 },
      { subject: "Software Engineering", percentage: 92, classes: 15, attended: 14 },
    ],
    monthlyTrend: [
      { month: "Aug", percentage: 94 },
      { month: "Sep", percentage: 91 },
      { month: "Oct", percentage: 89 },
      { month: "Nov", percentage: 92 },
      { month: "Dec", percentage: 88 },
    ],
  },
  fees: {
    totalAmount: 50000,
    paidAmount: 35000,
    pendingAmount: 15000,
    dueDate: "2024-02-15",
    installments: [
      { name: "Tuition Fee", amount: 30000, paid: 30000, status: "paid", dueDate: "2024-01-15" },
      { name: "Lab Fee", amount: 8000, paid: 5000, status: "partial", dueDate: "2024-02-01" },
      { name: "Library Fee", amount: 2000, paid: 0, status: "pending", dueDate: "2024-02-15" },
      { name: "Hostel Fee", amount: 10000, paid: 0, status: "pending", dueDate: "2024-02-15" },
    ],
  },
  examResults: [
    { exam: "Mid-term Exam", subject: "Mathematics", marks: 85, maxMarks: 100, grade: "A" },
    { exam: "Mid-term Exam", subject: "Data Structures", marks: 78, maxMarks: 100, grade: "B+" },
    { exam: "Mid-term Exam", subject: "Computer Networks", marks: 82, maxMarks: 100, grade: "A-" },
    { exam: "Assignment 1", subject: "Database Systems", marks: 92, maxMarks: 100, grade: "A+" },
    { exam: "Quiz 2", subject: "Software Engineering", marks: 88, maxMarks: 100, grade: "A" },
  ],
  notices: [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      message: "Scheduled for January 25th, 2024 at 10:00 AM in the main auditorium",
      date: "2024-01-20",
      type: "meeting",
      priority: "high",
    },
    {
      id: 2,
      title: "Fee Payment Reminder",
      message: "Semester fee payment due on February 15th, 2024",
      date: "2024-01-18",
      type: "fee",
      priority: "medium",
    },
    {
      id: 3,
      title: "Exam Schedule Released",
      message: "Final examination schedule has been published on the student portal",
      date: "2024-01-15",
      type: "exam",
      priority: "medium",
    },
    {
      id: 4,
      title: "Holiday Notice",
      message: "College will remain closed on January 26th for Republic Day",
      date: "2024-01-12",
      type: "holiday",
      priority: "low",
    },
  ],
}

export function ParentDashboard() {
  const user = getCurrentUser()

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-800"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-800"
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const feesPaidPercentage = Math.round((mockParentData.fees.paidAmount / mockParentData.fees.totalAmount) * 100)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Welcome, {user?.name}!</h1>
        <p className="text-muted-foreground text-pretty">
          Monitor {mockParentData.child.name}&apos;s academic progress and stay updated with school activities.
        </p>
      </div>

      {/* Child Info Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Student Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Student Name</p>
              <p className="font-semibold">{mockParentData.child.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Student ID</p>
              <p className="font-semibold">{mockParentData.child.studentId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Class</p>
              <p className="font-semibold">{mockParentData.child.class}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Semester</p>
              <p className="font-semibold">{mockParentData.child.semester}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getAttendanceColor(mockParentData.attendance.overall)}`}>
              {mockParentData.attendance.overall}%
            </div>
            <Progress value={mockParentData.attendance.overall} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fees Status</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feesPaidPercentage}%</div>
            <Progress value={feesPaidPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              ${mockParentData.fees.paidAmount.toLocaleString()} of ${mockParentData.fees.totalAmount.toLocaleString()}{" "}
              paid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Exam Avg</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockParentData.examResults.reduce((sum, result) => sum + (result.marks / result.maxMarks) * 100, 0) /
                  mockParentData.examResults.length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 5 assessments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Notices</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockParentData.notices.filter((notice) => notice.priority === "high").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">High priority items</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="fees">Fee Status</TabsTrigger>
          <TabsTrigger value="results">Exam Results</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
                <CardDescription>Current semester attendance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockParentData.attendance.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <h4 className="font-medium">{subject.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          {subject.attended} of {subject.classes} classes attended
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${getAttendanceColor(subject.percentage)}`}>
                          {subject.percentage}%
                        </div>
                        <Progress value={subject.percentage} className="w-20 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Trend</CardTitle>
                <CardDescription>Monthly attendance percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockParentData.attendance.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Fee Payment Status
              </CardTitle>
              <CardDescription>Semester fee breakdown and payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Total Semester Fee</span>
                  <span className="text-lg font-bold">${mockParentData.fees.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600">Amount Paid</span>
                  <span className="text-green-600 font-semibold">
                    ${mockParentData.fees.paidAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-red-600">Pending Amount</span>
                  <span className="text-red-600 font-semibold">
                    ${mockParentData.fees.pendingAmount.toLocaleString()}
                  </span>
                </div>
                <Progress value={feesPaidPercentage} className="mb-2" />
                <p className="text-sm text-muted-foreground">Next payment due: {mockParentData.fees.dueDate}</p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParentData.fees.installments.map((installment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{installment.name}</TableCell>
                      <TableCell>${installment.amount.toLocaleString()}</TableCell>
                      <TableCell>${installment.paid.toLocaleString()}</TableCell>
                      <TableCell>
                        {installment.status === "paid" && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Paid
                          </Badge>
                        )}
                        {installment.status === "partial" && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Clock className="h-3 w-3 mr-1" />
                            Partial
                          </Badge>
                        )}
                        {installment.status === "pending" && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{installment.dueDate}</TableCell>
                      <TableCell>
                        {installment.status !== "paid" && (
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Pay Now
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Exam Results
              </CardTitle>
              <CardDescription>Latest assessment scores and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam/Assessment</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Marks Obtained</TableHead>
                    <TableHead>Maximum Marks</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParentData.examResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.exam}</TableCell>
                      <TableCell>{result.subject}</TableCell>
                      <TableCell>{result.marks}</TableCell>
                      <TableCell>{result.maxMarks}</TableCell>
                      <TableCell>{Math.round((result.marks / result.maxMarks) * 100)}%</TableCell>
                      <TableCell>
                        <Badge className={getGradeColor(result.grade)}>{result.grade}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6">
                <h4 className="font-medium mb-4">Performance Overview</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockParentData.examResults}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value: number) => [`${value}%`, "Score"]} />
                    <Bar
                      dataKey={(entry) => Math.round((entry.marks / entry.maxMarks) * 100)}
                      fill="hsl(var(--primary))"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                School Notices & Updates
              </CardTitle>
              <CardDescription>Important announcements and communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockParentData.notices.map((notice) => (
                  <div key={notice.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(notice.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center gap-2">
                          {notice.title}
                          {notice.priority === "high" && <Badge variant="destructive">Urgent</Badge>}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{notice.message}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {notice.date}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {notice.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Notices
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
