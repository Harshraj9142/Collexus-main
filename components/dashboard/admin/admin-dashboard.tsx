"use client"

import { useState } from "react"
import { useStudentCount } from "@/hooks/use-student-count"
import { StudentCountTest } from "@/components/admin/student-count-test"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  DollarSign,
  Building,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Bell,
  FileText,
  UserPlus,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"
import { getCurrentUserClient as getCurrentUser } from "@/lib/auth-client"

// Mock data for admin dashboard
const mockAdminData = {
  stats: {
    totalStudents: 1247,
    totalFaculty: 89,
    pendingAdmissions: 23,
    hostelOccupancy: 85,
    feesCollected: 2450000,
    totalFees: 3000000,
  },
  feeCollection: [
    { name: "Paid", value: 2450000, color: "#10b981" },
    { name: "Pending", value: 550000, color: "#f59e0b" },
  ],
  monthlyAdmissions: [
    { month: "Jan", admissions: 45 },
    { month: "Feb", admissions: 52 },
    { month: "Mar", admissions: 38 },
    { month: "Apr", admissions: 67 },
    { month: "May", admissions: 43 },
    { month: "Jun", admissions: 89 },
  ],
  departmentStats: [
    { department: "Computer Science", students: 320, faculty: 25 },
    { department: "Information Technology", students: 280, faculty: 20 },
    { department: "Electronics", students: 245, faculty: 18 },
    { department: "Mechanical", students: 402, faculty: 26 },
  ],
  pendingApprovals: [
    {
      id: "ADM001",
      type: "admission",
      name: "John Smith",
      department: "Computer Science",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: "HST001",
      type: "hostel",
      name: "Sarah Johnson",
      roomType: "Single AC",
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: "ADM002",
      type: "admission",
      name: "Mike Wilson",
      department: "Information Technology",
      date: "2024-01-13",
      status: "pending",
    },
    {
      id: "HST002",
      type: "hostel",
      name: "Emily Davis",
      roomType: "Double Non-AC",
      date: "2024-01-12",
      status: "pending",
    },
  ],
  notifications: [
    {
      id: 1,
      title: "Fee Payment Deadline",
      message: "Semester fee payment deadline is approaching (Jan 31)",
      type: "warning",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "New Admission Application",
      message: "5 new admission applications received",
      type: "info",
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "Hostel Maintenance",
      message: "Block A maintenance scheduled for this weekend",
      type: "info",
      time: "1 day ago",
    },
  ],
}

export function AdminDashboard() {
  const user = getCurrentUser()
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const { studentCount, isLoading: isLoadingCount, error: countError, isConnected } = useStudentCount()

  const handleApproval = (id: string, action: "approve" | "reject") => {
    console.log(`${action} application ${id}`)
    // In a real app, this would make an API call
  }

  const feesCollectedPercentage = Math.round((mockAdminData.stats.feesCollected / mockAdminData.stats.totalFees) * 100)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Admin Dashboard</h1>
        <p className="text-muted-foreground text-pretty">
          Welcome, {user?.name}! Monitor college operations and manage administrative tasks.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              {isConnected && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Real-time updates active" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingCount ? (
                <div className="animate-pulse bg-muted h-8 w-16 rounded" />
              ) : countError ? (
                <span className="text-red-500">Error</span>
              ) : (
                studentCount.toLocaleString()
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isConnected ? (
                <>Real-time count • +{mockAdminData.stats.pendingAdmissions} pending admissions</>
              ) : (
                <>+{mockAdminData.stats.pendingAdmissions} pending admissions</>
              )}
            </p>
            {countError && (
              <p className="text-xs text-red-500 mt-1">{countError}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fees Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feesCollectedPercentage}%</div>
            <Progress value={feesCollectedPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              ${mockAdminData.stats.feesCollected.toLocaleString()} of ${mockAdminData.stats.totalFees.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hostel Occupancy</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminData.stats.hostelOccupancy}%</div>
            <Progress value={mockAdminData.stats.hostelOccupancy} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">850 of 1000 rooms occupied</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminData.pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="realtime">Real-time Test</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Real-time Student Count Testing</h3>
              <p className="text-muted-foreground">
                Test the real-time functionality by creating new students and watching the count update instantly.
              </p>
            </div>
            <StudentCountTest />
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fee Collection Status</CardTitle>
                <CardDescription>Current semester fee collection breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockAdminData.feeCollection}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockAdminData.feeCollection.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {mockAdminData.feeCollection.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>Students and faculty by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAdminData.departmentStats.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <h4 className="font-medium">{dept.department}</h4>
                        <p className="text-sm text-muted-foreground">
                          {dept.students} students • {dept.faculty} faculty
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{dept.students + dept.faculty}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Admissions Trend</CardTitle>
              <CardDescription>New student admissions over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockAdminData.monthlyAdmissions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="admissions"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Pending Approvals
              </CardTitle>
              <CardDescription>Review and approve admission and hostel applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                    <SelectItem value="ece">Electronics</SelectItem>
                    <SelectItem value="mech">Mechanical</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Bulk Actions
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAdminData.pendingApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell className="font-medium">{approval.id}</TableCell>
                      <TableCell>
                        <Badge variant={approval.type === "admission" ? "default" : "secondary"}>
                          {approval.type === "admission" ? "Admission" : "Hostel"}
                        </Badge>
                      </TableCell>
                      <TableCell>{approval.name}</TableCell>
                      <TableCell>{approval.type === "admission" ? approval.department : approval.roomType}</TableCell>
                      <TableCell>{approval.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                            onClick={() => handleApproval(approval.id, "approve")}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                            onClick={() => handleApproval(approval.id, "reject")}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Enrollment</CardTitle>
                <CardDescription>Student distribution across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockAdminData.departmentStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Faculty Distribution</CardTitle>
                <CardDescription>Faculty members by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockAdminData.departmentStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="faculty" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Important metrics for college administration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Student-Faculty Ratio</span>
                  </div>
                  <div className="text-2xl font-bold">14:1</div>
                  <p className="text-sm text-muted-foreground">Optimal range: 12-16</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Fee Collection Rate</span>
                  </div>
                  <div className="text-2xl font-bold">{feesCollectedPercentage}%</div>
                  <p className="text-sm text-muted-foreground">Target: 95%</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Hostel Utilization</span>
                  </div>
                  <div className="text-2xl font-bold">{mockAdminData.stats.hostelOccupancy}%</div>
                  <p className="text-sm text-muted-foreground">Capacity: 1000 rooms</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                System Notifications
              </CardTitle>
              <CardDescription>Important alerts and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminData.notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-4 rounded-lg border">
                    <div className="flex-shrink-0 mt-1">
                      {notification.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {notification.type === "info" && <Bell className="h-5 w-5 text-blue-500" />}
                      {notification.type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Mark as Read
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
