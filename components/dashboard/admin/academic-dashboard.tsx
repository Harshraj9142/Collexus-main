"use client"

import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  GraduationCap, 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BookOpen,
  UserCheck,
  ClipboardList,
  BarChart3,
  Download,
  RefreshCw,
  Filter,
  Search,
  Bell,
  Award,
  Target,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Plus,
  Settings,
  ChevronRight,
  Building2,
  BookMarked,
  Users2,
  CalendarDays,
  FileCheck,
  XCircle,
  Star,
  MessageSquare
} from 'lucide-react'

// Mock data for academic dashboard
const mockAcademicData = {
  admissions: {
    totalApplications: { today: 15, overall: 2847 },
    confirmedAdmissions: {
      total: 1892,
      byProgram: [
        { program: 'B.Tech', count: 856, percentage: 45.2 },
        { program: 'M.Tech', count: 324, percentage: 17.1 },
        { program: 'MBA', count: 298, percentage: 15.7 },
        { program: 'BBA', count: 234, percentage: 12.4 },
        { program: 'MCA', count: 180, percentage: 9.5 }
      ],
      byDepartment: [
        { department: 'Computer Science', count: 456, percentage: 24.1 },
        { department: 'Electronics', count: 387, percentage: 20.4 },
        { department: 'Mechanical', count: 342, percentage: 18.1 },
        { department: 'Civil', count: 298, percentage: 15.7 },
        { department: 'Business', count: 409, percentage: 21.6 }
      ]
    },
    pendingVerifications: 127,
    missingDocuments: 89,
    demographics: {
      genderRatio: { male: 62.3, female: 37.7 },
      domicile: { local: 68.4, outOfState: 31.6 },
      category: { general: 45.2, obc: 27.8, sc: 16.3, st: 10.7 }
    }
  },
  examinations: {
    upcomingExams: [
      { subject: 'Data Structures', date: '2024-02-15', time: '09:00 AM', students: 234, hall: 'A-Block' },
      { subject: 'Database Systems', date: '2024-02-16', time: '02:00 PM', students: 189, hall: 'B-Block' },
      { subject: 'Computer Networks', date: '2024-02-17', time: '09:00 AM', students: 267, hall: 'C-Block' },
      { subject: 'Software Engineering', date: '2024-02-18', time: '02:00 PM', students: 198, hall: 'A-Block' }
    ],
    totalRegistrations: 1456,
    pendingHallTickets: 78,
    resultsStatus: {
      inProcess: 23,
      published: 156,
      withheld: 12
    },
    gradeDistribution: {
      aGrade: 18.5,
      bGrade: 32.7,
      cGrade: 28.9,
      dGrade: 15.2,
      fail: 4.7
    }
  },
  academicRecords: {
    totalActiveStudents: 3247,
    byCourse: [
      { course: 'B.Tech CSE', year1: 324, year2: 298, year3: 276, year4: 245 },
      { course: 'B.Tech ECE', year1: 287, year2: 267, year3: 234, year4: 198 },
      { course: 'MBA', year1: 156, year2: 142, year3: 0, year4: 0 },
      { course: 'MCA', year1: 89, year2: 76, year3: 67, year4: 0 }
    ],
    incompleteProfiles: 156,
    outdatedProfiles: 89,
    departmentStrength: [
      { department: 'Computer Science', strength: 1143, capacity: 1200, utilization: 95.3 },
      { department: 'Electronics', strength: 986, capacity: 1100, utilization: 89.6 },
      { department: 'Mechanical', strength: 756, capacity: 900, utilization: 84.0 },
      { department: 'Civil', strength: 362, capacity: 500, utilization: 72.4 }
    ]
  }
}

export function AcademicDashboard() {
  const { data: session } = useSession()
  const [selectedTimeRange, setSelectedTimeRange] = useState('monthly')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'in process': return 'bg-yellow-100 text-yellow-800'
      case 'withheld': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl mt-3 font-bold text-balance">Academic Dashboard</h1>
        <p className="text-muted-foreground text-pretty">
          Welcome, {session?.user?.name}! Manage academic operations, student records, and educational analytics.
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{formatNumber(mockAcademicData.admissions.totalApplications.overall)}</div>
            <p className="text-xs text-blue-600 mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +{mockAcademicData.admissions.totalApplications.today} today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Confirmed Admissions</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{formatNumber(mockAcademicData.admissions.confirmedAdmissions.total)}</div>
            <p className="text-xs text-green-600 mt-1">
              <CheckCircle className="h-3 w-3 inline mr-1" />
              66.4% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Pending Verifications</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{mockAcademicData.admissions.pendingVerifications}</div>
            <p className="text-xs text-orange-600 mt-1">
              {mockAcademicData.admissions.missingDocuments} missing documents
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Active Students</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{formatNumber(mockAcademicData.academicRecords.totalActiveStudents)}</div>
            <p className="text-xs text-purple-600 mt-1">
              <GraduationCap className="h-3 w-3 inline mr-1" />
              Across all programs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="examinations">Examinations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Academic Overview</CardTitle>
                <CardDescription>Key academic metrics and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-600 font-medium">Total Students</div>
                      <div className="text-2xl font-bold text-blue-700">{formatNumber(mockAcademicData.academicRecords.totalActiveStudents)}</div>
                      <div className="text-xs text-blue-500">Active enrollment</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-sm text-green-600 font-medium">Pass Rate</div>
                      <div className="text-2xl font-bold text-green-700">95.3%</div>
                      <div className="text-xs text-green-500">Current semester</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="text-sm text-orange-600 font-medium">Pending</div>
                      <div className="text-2xl font-bold text-orange-700">{mockAcademicData.admissions.pendingVerifications}</div>
                      <div className="text-xs text-orange-500">Applications</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="text-sm text-purple-600 font-medium">Upcoming</div>
                      <div className="text-2xl font-bold text-purple-700">{mockAcademicData.examinations.upcomingExams.length}</div>
                      <div className="text-xs text-purple-500">Examinations</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest academic activities and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New student registrations</p>
                      <p className="text-xs text-muted-foreground">15 new applications today</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Exam results published</p>
                      <p className="text-xs text-muted-foreground">Database Systems - Semester 6</p>
                    </div>
                    <span className="text-xs text-muted-foreground">4h ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Document verification pending</p>
                      <p className="text-xs text-muted-foreground">89 students require attention</p>
                    </div>
                    <span className="text-xs text-muted-foreground">6h ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Academic performance across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAcademicData.academicRecords.departmentStrength.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <h4 className="font-medium">{dept.department}</h4>
                      <p className="text-sm text-muted-foreground">
                        {dept.strength} students • {dept.utilization}% capacity
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{dept.strength}</div>
                      <div className="text-xs text-muted-foreground">/{dept.capacity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="ece">Electronics</SelectItem>
                <SelectItem value="mech">Mechanical</SelectItem>
                <SelectItem value="civil">Civil</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Student Management
              </CardTitle>
              <CardDescription>Manage student records and academic information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">CS2024001</TableCell>
                    <TableCell>John Smith</TableCell>
                    <TableCell>Computer Science</TableCell>
                    <TableCell>2nd Year</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ECE2024002</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>Electronics</TableCell>
                    <TableCell>3rd Year</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ME2024003</TableCell>
                    <TableCell>Mike Wilson</TableCell>
                    <TableCell>Mechanical</TableCell>
                    <TableCell>1st Year</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Course Management</h3>
              <p className="text-muted-foreground">Manage courses, curriculum, and academic programs</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5" />
                  Active Courses
                </CardTitle>
                <CardDescription>Currently running courses this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Data Structures & Algorithms</div>
                      <div className="text-sm text-muted-foreground">CS301 • 234 students enrolled</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Database Management Systems</div>
                      <div className="text-sm text-muted-foreground">CS401 • 189 students enrolled</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Computer Networks</div>
                      <div className="text-sm text-muted-foreground">CS501 • 267 students enrolled</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users2 className="h-5 w-5" />
                  Faculty Assignment
                </CardTitle>
                <CardDescription>Course-faculty mapping and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">Dr. Smith Johnson</div>
                      <div className="text-sm text-muted-foreground">Data Structures & Algorithms</div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">Prof. Sarah Davis</div>
                      <div className="text-sm text-muted-foreground">Database Management Systems</div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">Dr. Mike Wilson</div>
                      <div className="text-sm text-muted-foreground">Computer Networks</div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examinations" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Examination Management</h3>
              <p className="text-muted-foreground">Manage exams, schedules, and results</p>
            </div>
            <Button>
              <CalendarDays className="h-4 w-4 mr-2" />
              Schedule Exam
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Examinations
                </CardTitle>
                <CardDescription>Next scheduled examinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAcademicData.examinations.upcomingExams.map((exam, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <div className="font-medium">{exam.subject}</div>
                        <div className="text-sm text-muted-foreground">{exam.date} • {exam.time}</div>
                        <div className="text-xs text-muted-foreground">{exam.hall}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">{exam.students}</div>
                        <div className="text-xs text-muted-foreground">students</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Examination Statistics
                </CardTitle>
                <CardDescription>Registration and results status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-600 font-medium">Total Registrations</div>
                    <div className="text-2xl font-bold text-blue-700">{formatNumber(mockAcademicData.examinations.totalRegistrations)}</div>
                    <div className="text-xs text-blue-500">For current semester</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="text-sm text-orange-600 font-medium">Pending Hall Tickets</div>
                    <div className="text-2xl font-bold text-orange-700">{mockAcademicData.examinations.pendingHallTickets}</div>
                    <div className="text-xs text-orange-500">Need to be generated</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-yellow-100 p-2 rounded">
                      <div className="font-semibold text-yellow-700">{mockAcademicData.examinations.resultsStatus.inProcess}</div>
                      <div className="text-yellow-600">In Process</div>
                    </div>
                    <div className="bg-green-100 p-2 rounded">
                      <div className="font-semibold text-green-700">{mockAcademicData.examinations.resultsStatus.published}</div>
                      <div className="text-green-600">Published</div>
                    </div>
                    <div className="bg-red-100 p-2 rounded">
                      <div className="font-semibold text-red-700">{mockAcademicData.examinations.resultsStatus.withheld}</div>
                      <div className="text-red-600">Withheld</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution Summary</CardTitle>
              <CardDescription>Pass-fail and grade distribution across all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">{mockAcademicData.examinations.gradeDistribution.aGrade}%</div>
                    <div className="text-sm text-green-600 font-medium">A Grade</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700">{mockAcademicData.examinations.gradeDistribution.bGrade}%</div>
                    <div className="text-sm text-blue-600 font-medium">B Grade</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-700">{mockAcademicData.examinations.gradeDistribution.cGrade}%</div>
                    <div className="text-sm text-yellow-600 font-medium">C Grade</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 p-4 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-orange-700">{mockAcademicData.examinations.gradeDistribution.dGrade}%</div>
                    <div className="text-sm text-orange-600 font-medium">D Grade</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-700">{mockAcademicData.examinations.gradeDistribution.fail}%</div>
                    <div className="text-sm text-red-600 font-medium">Fail</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-indigo-800">Admission Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-900">66.4%</div>
                <p className="text-xs text-indigo-600 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +3.2% from last year
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-teal-800">Pass Percentage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-900">95.3%</div>
                <p className="text-xs text-teal-600 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +1.8% from last semester
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-rose-800">Dropout Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-900">2.1%</div>
                <p className="text-xs text-rose-600 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  -0.5% from last year
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-amber-800">Faculty-Student Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">1:18</div>
                <p className="text-xs text-amber-600 mt-1">
                  <CheckCircle className="h-3 w-3 inline mr-1" />
                  Optimal range
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Academic Performance Trends</CardTitle>
                <CardDescription>Semester-wise performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average GPA</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-20 h-2" />
                      <span className="text-sm font-medium">3.12/4.0</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Course Completion Rate</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-20 h-2" />
                      <span className="text-sm font-medium">94.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-time Graduation</span>
                    <div className="flex items-center gap-2">
                      <Progress value={87} className="w-20 h-2" />
                      <span className="text-sm font-medium">87.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Academic metrics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAcademicData.academicRecords.departmentStrength.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{dept.department}</span>
                        <span className="text-sm text-muted-foreground">{dept.utilization}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={dept.utilization} className="flex-1 h-2" />
                        <span className="text-sm font-semibold min-w-0">
                          {dept.strength}/{dept.capacity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Academic Notifications
              </CardTitle>
              <CardDescription>Important academic alerts and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                  <div className="flex-shrink-0 mt-1">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-yellow-800">Exam Schedule Conflict</h4>
                    <p className="text-sm text-yellow-600 mt-1">2 exams scheduled at same time slot for Computer Science department</p>
                    <p className="text-xs text-yellow-600 mt-2">2 hours ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border border-red-200 bg-red-50">
                  <div className="flex-shrink-0 mt-1">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-red-800">Missing Documents</h4>
                    <p className="text-sm text-red-600 mt-1">89 students have incomplete documentation for admission verification</p>
                    <p className="text-xs text-red-600 mt-2">4 hours ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border border-blue-200 bg-blue-50">
                  <div className="flex-shrink-0 mt-1">
                    <Bell className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-blue-800">Registration Deadline</h4>
                    <p className="text-sm text-blue-600 mt-1">Next semester registration ends in 5 days</p>
                    <p className="text-xs text-blue-600 mt-2">1 day ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border border-green-200 bg-green-50">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-green-800">Results Published</h4>
                    <p className="text-sm text-green-600 mt-1">Semester 6 results have been published for all departments</p>
                    <p className="text-xs text-green-600 mt-2">2 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border border-purple-200 bg-purple-50">
                  <div className="flex-shrink-0 mt-1">
                    <Star className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-purple-800">Achievement Recognition</h4>
                    <p className="text-sm text-purple-600 mt-1">Computer Science department achieved 98% placement rate this semester</p>
                    <p className="text-xs text-purple-600 mt-2">3 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
