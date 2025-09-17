"use client"

import { useSession } from "next-auth/react"
import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  ClipboardList,
  Calendar,
  Bell,
  CheckCircle,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  FileCheck2,
  BarChart3,
} from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts"

function AssistantHODDashboardHeader() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Assistant HOD Dashboard</h1>
        <p className="text-muted-foreground text-pretty">
          Welcome, {session?.user?.name}! Assist your HOD with approvals, timetables and department coordination.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Course and schedule requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty Coordination</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Meetings and classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Unresolved alerts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="approvals" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Items Requiring Action</CardTitle>
              <CardDescription>Approve or escalate departmental requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Course change - CS101", "Room allocation - IT-A", "New elective proposal"].map((title, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-md border">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">#{i + 1}</Badge>
                    <span className="font-medium">{title}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Schedule</CardTitle>
              <CardDescription>Coordinated meetings and classes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: "09:00 AM", item: "Dept briefing", status: "upcoming" },
                { time: "12:00 PM", item: "HOD sync", status: "upcoming" },
                { time: "03:30 PM", item: "Timetable review", status: "completed" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-md border">
                  <div>
                    <div className="font-semibold">{row.time}</div>
                    <div className="text-sm text-muted-foreground">{row.item}</div>
                  </div>
                  {row.status === "completed" ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                    </Badge>
                  ) : (
                    <Badge>Upcoming</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Alerts</CardTitle>
              <CardDescription>Important updates from the HOD and admins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Submit attendance summary", "Resolve room conflict: 2:00 PM"].map((msg, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-md border">
                  <span>{msg}</span>
                  <Button variant="ghost" size="sm">Resolve</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

 

// Mock data (can be replaced with real API data later)
const mockCourses = [
  { code: "CS101", name: "Data Structures", semester: 3, teacher: "Dr. Smith", schedule: "Mon 10:00-11:00", room: "A-201", status: "assigned" },
  { code: "CS205", name: "Operating Systems", semester: 4, teacher: "Prof. Allen", schedule: "Tue 12:00-1:00", room: "A-105", status: "assigned" },
  { code: "CS310", name: "DBMS", semester: 5, teacher: "Dr. Rose", schedule: "Wed 9:00-10:00", room: "B-104", status: "pending" },
]

const mockTeacherLoads = [
  { teacher: "Dr. Smith", classesPerWeek: 10 },
  { teacher: "Prof. Allen", classesPerWeek: 8 },
  { teacher: "Dr. Rose", classesPerWeek: 12 },
  { teacher: "Dr. John", classesPerWeek: 9 },
]

const mockClasses = [
  { class: "CS-3A", students: 58, mentor: "Dr. Smith" },
  { class: "CS-3B", students: 61, mentor: "Prof. Allen" },
  { class: "CS-4A", students: 55, mentor: "Dr. Rose" },
  { class: "CS-5A", students: 52, mentor: "Dr. John" },
]

const mockRequests = [
  { id: "REQ-1021", type: "Substitution", by: "Dr. Smith", details: "03 Oct, 10:00-11:00 substitute needed", status: "pending" },
  { id: "REQ-1045", type: "Classroom Change", by: "Prof. Allen", details: "Need lab for OS class on Tue 12:00", status: "pending" },
  { id: "REQ-1050", type: "Schedule Update", by: "Dr. Rose", details: "DBMS moved to Wed 11:00", status: "approved" },
]

const mockConflicts = [
  { id: "CON-301", student: "S-12993", class: "CS-4A", conflict: "Overlapping: DBMS vs OS (Wed 11:00)", severity: "high" },
  { id: "CON-322", student: "S-12044", class: "CS-3B", conflict: "Back-to-back: DS -> Math (5 mins gap)", severity: "medium" },
]

const mockPersonal = [
  { time: "09:00 - 10:00", title: "Algorithms - CS-3A", room: "A-102", status: "upcoming" },
  { time: "11:00 - 12:00", title: "Dept. Review Meeting", room: "Conf-1", status: "upcoming" },
  { time: "14:00 - 15:00", title: "Student Counseling", room: "HOD Cabin", status: "upcoming" },
]

const mockUtilization = [
  { name: "Dr. Smith", hours: 10, assigned: 12 },
  { name: "Prof. Allen", hours: 8, assigned: 12 },
  { name: "Dr. Rose", hours: 11, assigned: 12 },
  { name: "Dr. John", hours: 9, assigned: 12 },
]

export function AssistantHODDashboard() {
  const [semesterFilter, setSemesterFilter] = useState<string>("all")
  const [searchCourse, setSearchCourse] = useState("")
  const [requestFilter, setRequestFilter] = useState<string>("pending")

  const filteredCourses = useMemo(() => {
    return mockCourses.filter((c) =>
      (semesterFilter === "all" || String(c.semester) === semesterFilter) &&
      (searchCourse.trim() === "" ||
        c.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
        c.name.toLowerCase().includes(searchCourse.toLowerCase()))
    )
  }, [semesterFilter, searchCourse])

  const pendingCount = mockRequests.filter(r => r.status === "pending").length
  const conflictCount = mockConflicts.length

  const statusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-600">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-600">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-600">Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Open Requests</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <FileCheck2 className="h-6 w-6 text-primary" /> {pendingCount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Substitution, classroom change, updates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Detected Conflicts</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <AlertTriangle className="h-6 w-6 text-destructive" /> {conflictCount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Student/teacher timetable issues</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Teachers</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <Users className="h-6 w-6 text-primary" /> {mockTeacherLoads.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Active in department</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>My Schedule Today</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <Calendar className="h-6 w-6 text-primary" /> {mockPersonal.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Classes / meetings</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timetable" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="timetable">Timetable Management</TabsTrigger>
          <TabsTrigger value="overview">Class & Teacher Overview</TabsTrigger>
          <TabsTrigger value="requests">Requests & Approvals</TabsTrigger>
          <TabsTrigger value="personal">Personal Schedule</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Timetable Management */}
        <TabsContent value="timetable" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>HOD-assigned Courses</CardTitle>
                <CardDescription>Review, modify and approve schedules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="w-full md:w-48">
                    <Label>Semester</Label>
                    <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                      <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label>Search</Label>
                    <Input value={searchCourse} onChange={(e) => setSearchCourse(e.target.value)} placeholder="Search by code or name" />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((c) => (
                      <TableRow key={c.code}>
                        <TableCell className="font-medium">{c.code}</TableCell>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.teacher}</TableCell>
                        <TableCell>{c.schedule}</TableCell>
                        <TableCell>{c.room}</TableCell>
                        <TableCell>
                          {c.status === "assigned" ? (
                            <Badge className="bg-blue-600">Assigned</Badge>
                          ) : (
                            <Badge className="bg-yellow-600">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="secondary">Modify</Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conflict Detection</CardTitle>
                <CardDescription>Resolve overlaps and constraints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Resolve</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockConflicts.map((cf) => (
                      <TableRow key={cf.id}>
                        <TableCell className="font-medium">{cf.id}</TableCell>
                        <TableCell>{cf.student}</TableCell>
                        <TableCell>{cf.conflict}</TableCell>
                        <TableCell>
                          {cf.severity === "high" ? (
                            <Badge className="bg-destructive">High</Badge>
                          ) : (
                            <Badge className="bg-yellow-600">Medium</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" className="bg-primary">Resolve</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Class & Teacher Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Classes</CardTitle>
                <CardDescription>Strength and mentors</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Mentor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClasses.map((cl) => (
                      <TableRow key={cl.class}>
                        <TableCell className="font-medium">{cl.class}</TableCell>
                        <TableCell>{cl.students}</TableCell>
                        <TableCell>{cl.mentor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Teacher Load Summary</CardTitle>
                <CardDescription>Weekly classes per teacher</CardDescription>
              </CardHeader>
              <CardContent style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockTeacherLoads}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="teacher" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="classesPerWeek" fill="hsl(var(--primary))" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Requests & Approvals */}
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incoming Requests</CardTitle>
              <CardDescription>Manage substitutions and classroom changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-2 mb-3">
                <div className="w-full md:w-56">
                  <Label>Filter</Label>
                  <Select value={requestFilter} onValueChange={setRequestFilter}>
                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>By</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRequests
                    .filter(r => requestFilter === "all" ? true : r.status === requestFilter)
                    .map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.id}</TableCell>
                        <TableCell>{r.type}</TableCell>
                        <TableCell>{r.by}</TableCell>
                        <TableCell>{r.details}</TableCell>
                        <TableCell>{statusBadge(r.status)}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="secondary">Details</Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                          <Button size="sm" variant="destructive">Reject</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personal Schedule */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today</CardTitle>
              <CardDescription>Your schedule and meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPersonal.map((p, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{p.time}</TableCell>
                      <TableCell>{p.title}</TableCell>
                      <TableCell>{p.room}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-600">{p.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Utilization</CardTitle>
                <CardDescription>Hours taught vs assigned</CardDescription>
              </CardHeader>
              <CardContent style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockUtilization}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="assigned" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Student Timetable Conflicts</CardTitle>
                <CardDescription>Summary of current issues</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockConflicts.map((c) => (
                    <li key={c.id} className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
                      <div>
                        <div className="font-medium">{c.id} • {c.class}</div>
                        <div className="text-sm text-muted-foreground">{c.conflict}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AssistantHODDashboard
