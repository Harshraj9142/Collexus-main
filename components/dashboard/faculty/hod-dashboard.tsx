"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bell,
  FileText,
  Search,
  Plus,
  Edit,
  Eye,
  UserCheck,
  GraduationCap,
  Building,
  BarChart3,
  PieChart,
} from "lucide-react"
import {
  PieChart as RechartsPieChart,
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
  Area,
  AreaChart,
} from "recharts"

// Mock data for HOD dashboard
const mockHODData = {
  stats: {
    totalTeachers: 24,
    totalCourses: 18,
    totalStudents: 420,
    departmentUtilization: 85,
    averageAttendance: 78,
    pendingApprovals: 5,
    activeClasses: 12,
    completedClasses: 156,
  },
  teachers: [
    {
      id: "T001",
      name: "Dr. Sarah Johnson",
      designation: "Professor",
      subjects: ["Data Structures", "Algorithms"],
      classes: ["CS-A", "CS-B"],
      attendance: 95,
      performance: 92,
      experience: "8 years",
      status: "active",
    },
    {
      id: "T002", 
      name: "Prof. Michael Chen",
      designation: "Associate Professor",
      subjects: ["Database Systems", "Software Engineering"],
      classes: ["CS-A", "IT-A"],
      attendance: 88,
      performance: 89,
      experience: "6 years",
      status: "active",
    },
    {
      id: "T003",
      name: "Dr. Emily Davis",
      designation: "Assistant Professor", 
      subjects: ["Computer Networks", "Operating Systems"],
      classes: ["CS-B", "IT-B"],
      attendance: 92,
      performance: 91,
      experience: "4 years",
      status: "active",
    },
  ],
  courses: [
    {
      id: "CS101",
      name: "Data Structures",
      teacher: "Dr. Sarah Johnson",
      classes: ["CS-A", "CS-B"],
      students: 58,
      schedule: "Mon, Wed, Fri - 9:00 AM",
      room: "Room 301",
      status: "active",
    },
    {
      id: "CS102",
      name: "Database Systems",
      teacher: "Prof. Michael Chen",
      classes: ["CS-A"],
      students: 30,
      schedule: "Tue, Thu - 11:00 AM",
      room: "Room 205",
      status: "active",
    },
  ],
  departmentPerformance: [
    { month: "Jan", attendance: 75, performance: 82, utilization: 78 },
    { month: "Feb", attendance: 78, performance: 85, utilization: 82 },
    { month: "Mar", attendance: 76, performance: 83, utilization: 80 },
    { month: "Apr", attendance: 82, performance: 87, utilization: 85 },
    { month: "May", attendance: 85, performance: 89, utilization: 88 },
    { month: "Jun", attendance: 78, performance: 86, utilization: 85 },
  ],
  classDistribution: [
    { class: "CS-A", students: 30, color: "#3b82f6" },
    { class: "CS-B", students: 28, color: "#10b981" },
    { class: "IT-A", students: 25, color: "#f59e0b" },
    { class: "IT-B", students: 27, color: "#ef4444" },
  ],
  todaySchedule: [
    {
      time: "09:00 AM",
      subject: "Department Meeting",
      type: "meeting",
      location: "Conference Room",
      status: "upcoming",
    },
    {
      time: "11:00 AM", 
      subject: "Data Structures - CS-A",
      type: "class",
      location: "Room 301",
      status: "upcoming",
    },
    {
      time: "02:00 PM",
      subject: "Faculty Review",
      type: "review",
      location: "HOD Office",
      status: "upcoming",
    },
  ],
  notifications: [
    {
      id: 1,
      title: "Schedule Conflict Alert",
      message: "Room 301 double-booked for 2:00 PM slot",
      type: "warning",
      time: "1 hour ago",
    },
    {
      id: 2,
      title: "New Course Approval",
      message: "Machine Learning course pending approval",
      type: "info", 
      time: "2 hours ago",
    },
  ],
}

export function HODDashboard() {
  const { data: session } = useSession()
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedTeacher, setSelectedTeacher] = useState("all")

  const attendancePercentage = mockHODData.stats.averageAttendance
  const utilizationPercentage = mockHODData.stats.departmentUtilization

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">HOD Dashboard</h1>
        <p className="text-muted-foreground text-pretty">
          Welcome, {session?.user?.name}! Manage your department, oversee faculty, and monitor academic performance.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockHODData.stats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">Under department</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockHODData.stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockHODData.stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendancePercentage}%</div>
            <Progress value={attendancePercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Department average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="notifications">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Class Distribution</CardTitle>
                <CardDescription>Student count by class</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={mockHODData.classDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="students"
                    >
                      {mockHODData.classDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value} students`} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {mockHODData.classDistribution.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm">{entry.class}: {entry.students}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance Trends</CardTitle>
                <CardDescription>Monthly metrics overview</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockHODData.departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Attendance %"
                    />
                    <Line
                      type="monotone"
                      dataKey="performance"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="Performance %"
                    />
                    <Line
                      type="monotone"
                      dataKey="utilization"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      name="Utilization %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Department Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{utilizationPercentage}%</div>
                <Progress value={utilizationPercentage} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {mockHODData.stats.activeClasses} active classes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{mockHODData.stats.pendingApprovals}</div>
                <p className="text-sm text-muted-foreground">Require attention</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Review All
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Classes Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{mockHODData.stats.completedClasses}</div>
                <p className="text-sm text-muted-foreground">This semester</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Teacher Management
              </CardTitle>
              <CardDescription>Manage faculty members and their assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input placeholder="Search teachers..." className="max-w-sm" />
                </div>
                <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teachers</SelectItem>
                    <SelectItem value="professor">Professors</SelectItem>
                    <SelectItem value="associate">Associate Professors</SelectItem>
                    <SelectItem value="assistant">Assistant Professors</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Teacher
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHODData.teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{teacher.name}</div>
                          <div className="text-sm text-muted-foreground">{teacher.experience}</div>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.designation}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((subject, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {teacher.classes.map((cls, idx) => (
                          <Badge key={idx} variant="outline" className="mr-1">
                            {cls}
                          </Badge>
                        ))}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{teacher.attendance}%</span>
                          <Progress value={teacher.attendance} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={teacher.performance >= 90 ? "default" : "secondary"}
                          className={teacher.performance >= 90 ? "bg-green-500" : ""}
                        >
                          {teacher.performance}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
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

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Class Management
              </CardTitle>
              <CardDescription>Manage departmental timetable and class assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="CS-A">CS-A</SelectItem>
                    <SelectItem value="CS-B">CS-B</SelectItem>
                    <SelectItem value="IT-A">IT-A</SelectItem>
                    <SelectItem value="IT-B">IT-B</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Timetable
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Class
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHODData.courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{course.name}</div>
                          <div className="text-sm text-muted-foreground">{course.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{course.teacher}</TableCell>
                      <TableCell>
                        {course.classes.map((cls, idx) => (
                          <Badge key={idx} variant="outline" className="mr-1">
                            {cls}
                          </Badge>
                        ))}
                      </TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell className="text-sm">{course.schedule}</TableCell>
                      <TableCell>{course.room}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500">
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
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

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Attendance Summary</CardTitle>
                <CardDescription>Monthly attendance trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockHODData.departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 90]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="attendance"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Teacher and student performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockHODData.departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[75, 95]} />
                    <Tooltip />
                    <Bar dataKey="performance" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Department-wide metrics and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Teacher Retention</span>
                  </div>
                  <div className="text-2xl font-bold">96%</div>
                  <p className="text-sm text-muted-foreground">This academic year</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Student Success Rate</span>
                  </div>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-sm text-muted-foreground">Pass percentage</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Resource Utilization</span>
                  </div>
                  <div className="text-2xl font-bold">{utilizationPercentage}%</div>
                  <p className="text-sm text-muted-foreground">Classroom usage</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">Course Completion</span>
                  </div>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-sm text-muted-foreground">On-time completion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Personal Schedule
              </CardTitle>
              <CardDescription>Your classes, meetings, and appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHODData.todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-semibold">{item.time}</div>
                        <Badge
                          variant={item.type === "meeting" ? "default" : item.type === "class" ? "secondary" : "outline"}
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.subject}</h3>
                        <p className="text-sm text-muted-foreground">{item.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {item.status === "upcoming" && (
                        <Button variant="outline" size="sm">
                          Join/Start
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Department Alerts & Notifications
              </CardTitle>
              <CardDescription>Important updates and alerts for your department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHODData.notifications.map((notification) => (
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
                      Resolve
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
