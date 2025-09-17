"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Users, BookOpen, TrendingUp, Calendar, Upload, CheckCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { getCurrentUserClient as getCurrentUser } from "@/lib/auth-client"
import { useSession } from "next-auth/react"
import { HODDashboard } from "./hod-dashboard"
import { AssistantHODDashboard } from "./assistant-hod-dashboard"
import { TeacherDashboard } from "./teacher-dashboard"

// Mock data for faculty dashboard
const mockFacultyData = {
  todayClasses: [
    { time: "09:00 AM", subject: "Mathematics", class: "CS-A", room: "Room 101", status: "upcoming" },
    { time: "11:00 AM", subject: "Data Structures", class: "CS-B", room: "Room 205", status: "completed" },
    { time: "02:00 PM", subject: "Algorithms", class: "CS-A", room: "Room 301", status: "upcoming" },
    { time: "04:00 PM", subject: "Mathematics", class: "IT-A", room: "Room 102", status: "upcoming" },
  ],
  students: [
    { id: "CS001", name: "John Doe", class: "CS-A", attendance: true },
    { id: "CS002", name: "Jane Smith", class: "CS-A", attendance: false },
    { id: "CS003", name: "Mike Johnson", class: "CS-A", attendance: true },
    { id: "CS004", name: "Sarah Wilson", class: "CS-A", attendance: true },
    { id: "CS005", name: "David Brown", class: "CS-A", attendance: false },
  ],
  classPerformance: [
    { class: "CS-A", avgScore: 85, students: 30 },
    { class: "CS-B", avgScore: 78, students: 28 },
    { class: "IT-A", avgScore: 82, students: 25 },
    { class: "IT-B", avgScore: 79, students: 27 },
  ],
  subjectTrends: [
    { month: "Jan", mathematics: 82, dataStructures: 78, algorithms: 85 },
    { month: "Feb", mathematics: 85, dataStructures: 80, algorithms: 87 },
    { month: "Mar", mathematics: 83, dataStructures: 82, algorithms: 89 },
    { month: "Apr", mathematics: 87, dataStructures: 85, algorithms: 91 },
    { month: "May", mathematics: 89, dataStructures: 87, algorithms: 93 },
  ],
}

export function FacultyDashboard() {
  const { data: session } = useSession()
  const user = getCurrentUser()
  const [selectedClass, setSelectedClass] = useState("CS-A")
  const [selectedSubject, setSelectedSubject] = useState("mathematics")
  const [attendanceData, setAttendanceData] = useState(mockFacultyData.students)

  // Show dedicated dashboards per faculty sub-role
  if (session?.user?.FacultySubRole === 'hod') {
    return <HODDashboard />
  }
  if (session?.user?.FacultySubRole === 'assistant_hod') {
    return <AssistantHODDashboard />
  }
  if (session?.user?.FacultySubRole === 'professor') {
    return <TeacherDashboard />
  }


  const handleAttendanceChange = (studentId: string, present: boolean) => {
    setAttendanceData((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, attendance: present } : student)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "upcoming":
        return "bg-blue-500"
      case "ongoing":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const presentCount = attendanceData.filter((student) => student.attendance).length
  const attendancePercentage = Math.round((presentCount / attendanceData.length) * 100)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Welcome, {user?.name}!</h1>
        <p className="text-muted-foreground text-pretty">
          Manage your classes, track student progress, and upload assessments.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFacultyData.todayClasses.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockFacultyData.todayClasses.filter((c) => c.status === "completed").length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockFacultyData.classPerformance.reduce((sum, cls) => sum + cls.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockFacultyData.classPerformance.reduce((sum, cls) => sum + cls.avgScore, 0) /
                  mockFacultyData.classPerformance.length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects Teaching</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="timetable" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timetable">Today&apos;s Schedule</TabsTrigger>
          <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
          <TabsTrigger value="marks">Upload Marks</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="timetable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today&apos;s Timetable
              </CardTitle>
              <CardDescription>Your scheduled classes for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFacultyData.todayClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-semibold">{classItem.time}</div>
                        <Badge className={getStatusColor(classItem.status)} variant="secondary">
                          {classItem.status}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold">{classItem.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          {classItem.class} • {classItem.room}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {classItem.status === "upcoming" && (
                        <>
                          <Button variant="outline" size="sm">
                            Mark Attendance
                          </Button>
                          <Button size="sm">Start Class</Button>
                        </>
                      )}
                      {classItem.status === "completed" && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Mark Attendance
              </CardTitle>
              <CardDescription>Select class and mark student attendance for today&apos;s session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="class-select">Select Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CS-A">CS-A</SelectItem>
                      <SelectItem value="CS-B">CS-B</SelectItem>
                      <SelectItem value="IT-A">IT-A</SelectItem>
                      <SelectItem value="IT-B">IT-B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="subject-select">Subject</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="dataStructures">Data Structures</SelectItem>
                      <SelectItem value="algorithms">Algorithms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">Attendance Summary</p>
                  <p className="text-sm text-muted-foreground">
                    {presentCount} of {attendanceData.length} students present ({attendancePercentage}%)
                  </p>
                </div>
                <Button>Save Attendance</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead className="text-center">Present</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={student.attendance}
                          onCheckedChange={(checked) => handleAttendanceChange(student.id, !!checked)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Marks
              </CardTitle>
              <CardDescription>Upload assessment marks for your students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="assessment-type">Assessment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assessment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="midterm">Mid-term Exam</SelectItem>
                      <SelectItem value="final">Final Exam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="max-marks">Maximum Marks</Label>
                  <Input type="number" placeholder="100" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="class-marks">Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CS-A">CS-A</SelectItem>
                      <SelectItem value="CS-B">CS-B</SelectItem>
                      <SelectItem value="IT-A">IT-A</SelectItem>
                      <SelectItem value="IT-B">IT-B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subject-marks">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="dataStructures">Data Structures</SelectItem>
                      <SelectItem value="algorithms">Algorithms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="assessment-title">Assessment Title</Label>
                <Input placeholder="e.g., Chapter 5 Quiz, Assignment 2" />
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea placeholder="Additional notes about the assessment..." />
              </div>

              <div className="flex items-center gap-4 p-4 border-2 border-dashed rounded-lg">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Upload CSV File</p>
                  <p className="text-sm text-muted-foreground">Upload a CSV file with student IDs and marks</p>
                </div>
                <Button variant="outline">Choose File</Button>
              </div>

              <div className="flex gap-2">
                <Button>Upload Marks</Button>
                <Button variant="outline">Download Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Overview</CardTitle>
                <CardDescription>Average scores by class</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockFacultyData.classPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="avgScore" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Trends</CardTitle>
                <CardDescription>Monthly average scores by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockFacultyData.subjectTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="mathematics" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                    <Line type="monotone" dataKey="dataStructures" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                    <Line type="monotone" dataKey="algorithms" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Class Statistics</CardTitle>
              <CardDescription>Detailed performance metrics for each class</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Average Score</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFacultyData.classPerformance.map((cls) => (
                    <TableRow key={cls.class}>
                      <TableCell className="font-medium">{cls.class}</TableCell>
                      <TableCell>{cls.students}</TableCell>
                      <TableCell>{cls.avgScore}%</TableCell>
                      <TableCell>
                        {cls.avgScore >= 85 ? (
                          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                        ) : cls.avgScore >= 75 ? (
                          <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
