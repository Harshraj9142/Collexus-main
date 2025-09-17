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
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  Bell,
  CheckCircle,
  AlertTriangle,
  Upload,
  FileText,
  Send,
  TrendingUp,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts"

// Mock data for Teacher (Professor) dashboard
const mockTeacherData = {
  scheduleToday: [
    { time: "09:00 AM", subject: "Data Structures", class: "CS-A", room: "301", status: "upcoming" },
    { time: "11:00 AM", subject: "Algorithms", class: "CS-B", room: "205", status: "upcoming" },
    { time: "02:00 PM", subject: "Tutorial - DS", class: "CS-A", room: "Lab-1", status: "upcoming" },
  ],
  weeklySchedule: [
    { day: "Mon", classes: 3 },
    { day: "Tue", classes: 2 },
    { day: "Wed", classes: 4 },
    { day: "Thu", classes: 2 },
    { day: "Fri", classes: 3 },
  ],
  classes: [
    { id: "CS-A-DS", name: "Data Structures", code: "CS201", class: "CS-A", students: 30 },
    { id: "CS-B-ALG", name: "Algorithms", code: "CS205", class: "CS-B", students: 28 },
  ],
  roster: [
    { id: "CS001", name: "John Doe", email: "john@demo.com", attendance: 92 },
    { id: "CS002", name: "Jane Smith", email: "jane@demo.com", attendance: 88 },
    { id: "CS003", name: "Ali Raza", email: "ali@demo.com", attendance: 95 },
  ],
  performanceTrend: [
    { month: "Jan", avg: 78 },
    { month: "Feb", avg: 80 },
    { month: "Mar", avg: 82 },
    { month: "Apr", avg: 84 },
    { month: "May", avg: 86 },
  ],
  notifications: [
    { id: 1, type: "info", title: "HOD Announcement", message: "Department meeting at 4 PM", time: "1h ago" },
    { id: 2, type: "warning", title: "Room Change", message: "11 AM class moved to Room 102", time: "2h ago" },
    { id: 3, type: "success", title: "Approval", message: "Reschedule request approved", time: "Yesterday" },
  ],
}

export function TeacherDashboard() {
  const { data: session } = useSession()
  const [selectedClass, setSelectedClass] = useState("CS-A")
  const [selectedCourse, setSelectedCourse] = useState("CS201")

  const totalToday = mockTeacherData.scheduleToday.length

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Teacher Dashboard</h1>
        <p className="text-muted-foreground text-pretty">
          Welcome, {session?.user?.name}! Manage your schedule, handle your classes, and stay updated.
        </p>
      </div>

      {/* Top KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today\'s Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalToday}</div>
            <p className="text-xs text-muted-foreground">Check your timetable below</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeacherData.classes.length}</div>
            <p className="text-xs text-muted-foreground">Assigned to you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockTeacherData.classes.reduce((sum, c) => sum + c.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across your classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">Based on recent assessments</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
          <TabsTrigger value="classes">Class Management</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* My Schedule */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today\'s Timetable
              </CardTitle>
              <CardDescription>Your scheduled classes for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeacherData.scheduleToday.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-semibold">{item.time}</div>
                        <Badge variant="secondary">{item.status}</Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.class} • Room {item.room}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Take Attendance</Button>
                      <Button size="sm">Start Class</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Class Load</CardTitle>
              <CardDescription>Overview of classes across the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={mockTeacherData.weeklySchedule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="classes" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Class Management */}
        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Take Attendance
              </CardTitle>
              <CardDescription>Select class and mark today\'s attendance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CS-A">CS-A</SelectItem>
                      <SelectItem value="CS-B">CS-B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Course</label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CS201">Data Structures</SelectItem>
                      <SelectItem value="CS205">Algorithms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Load Roster</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">Attendance Summary</p>
                  <p className="text-sm text-muted-foreground">Present: 24 / 30 (80%)</p>
                </div>
                <Button>Save Attendance</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Present</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTeacherData.roster.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.id}</TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>
                        <Badge variant={s.attendance > 90 ? "default" : "secondary"}>{s.attendance}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Record Grades / Assignments
              </CardTitle>
              <CardDescription>Upload grades or add new assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Assessment Title</label>
                  <Input placeholder="e.g., Mid-term Exam, Assignment 2" />
                </div>
                <div>
                  <label className="text-sm font-medium">Maximum Marks</label>
                  <Input type="number" placeholder="100" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Instructions (Optional)</label>
                <Textarea placeholder="Any notes for students..." />
              </div>
              <div className="flex gap-2">
                <Button>Upload Grades CSV</Button>
                <Button variant="outline">Download Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requests */}
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Submit Request
              </CardTitle>
              <CardDescription>Send substitution or reschedule request to HOD/Assistant HOD</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Request Type</label>
                  <Select defaultValue="substitution">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="substitution">Substitution</SelectItem>
                      <SelectItem value="reschedule">Reschedule</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Target Class</label>
                  <Select defaultValue="CS-A">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CS-A">CS-A</SelectItem>
                      <SelectItem value="CS-B">CS-B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Describe your request..." />
              </div>
              <div className="flex gap-2">
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Submit
                </Button>
                <Button variant="outline">Reset</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>Your recent submissions and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[{id:"REQ001", type:"Substitution", cls:"CS-A", status:"Pending", date:"2025-09-15"}, {id:"REQ002", type:"Reschedule", cls:"CS-B", status:"Approved", date:"2025-09-10"}].map(r => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.id}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell>{r.cls}</TableCell>
                      <TableCell>
                        <Badge variant={r.status === 'Approved' ? 'default' : r.status === 'Rejected' ? 'destructive' : 'outline'}>
                          {r.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{r.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Hours</CardTitle>
              <CardDescription>Total hours conducted per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={mockTeacherData.weeklySchedule.map((d, i) => ({ month: ['Jan','Feb','Mar','Apr','May'][i] || d.day, hours: d.classes * 4 }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>Average performance trend in your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={mockTeacherData.performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avg" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alerts & Announcements
              </CardTitle>
              <CardDescription>Updates from HOD / Assistant HOD</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeacherData.notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 p-4 rounded-lg border">
                    <div className="flex-shrink-0 mt-1">
                      {n.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {n.type === 'info' && <Bell className="h-5 w-5 text-blue-500" />}
                      {n.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{n.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{n.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">Mark as Read</Button>
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
