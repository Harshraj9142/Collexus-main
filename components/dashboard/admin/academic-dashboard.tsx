"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Target
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
  const [selectedTimeRange, setSelectedTimeRange] = useState('monthly')

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
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive academic management and analytics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
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
      <Tabs defaultValue="admissions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="admissions">Admissions</TabsTrigger>
          <TabsTrigger value="examinations">Examinations</TabsTrigger>
          <TabsTrigger value="academic-records">Academic Records</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Admissions Tab */}
        <TabsContent value="admissions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Applications Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Applications Overview
                </CardTitle>
                <CardDescription>Today's and overall application statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-600 font-medium">Today</div>
                      <div className="text-2xl font-bold text-blue-700">{mockAcademicData.admissions.totalApplications.today}</div>
                      <div className="text-xs text-blue-500">New applications</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-sm text-green-600 font-medium">Overall</div>
                      <div className="text-2xl font-bold text-green-700">{formatNumber(mockAcademicData.admissions.totalApplications.overall)}</div>
                      <div className="text-xs text-green-500">Total applications</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="text-sm text-orange-600 font-medium">Pending</div>
                      <div className="text-2xl font-bold text-orange-700">{mockAcademicData.admissions.pendingVerifications}</div>
                      <div className="text-xs text-orange-500">Verifications</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="text-sm text-red-600 font-medium">Missing</div>
                      <div className="text-2xl font-bold text-red-700">{mockAcademicData.admissions.missingDocuments}</div>
                      <div className="text-xs text-red-500">Documents</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demographics Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Demographics Overview
                </CardTitle>
                <CardDescription>Student demographics breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Gender Ratio</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-blue-100 p-2 rounded text-center">
                        <div className="text-sm font-semibold text-blue-700">Male: {mockAcademicData.admissions.demographics.genderRatio.male}%</div>
                      </div>
                      <div className="bg-pink-100 p-2 rounded text-center">
                        <div className="text-sm font-semibold text-pink-700">Female: {mockAcademicData.admissions.demographics.genderRatio.female}%</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Domicile Status</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-100 p-2 rounded text-center">
                        <div className="text-sm font-semibold text-green-700">Local: {mockAcademicData.admissions.demographics.domicile.local}%</div>
                      </div>
                      <div className="bg-yellow-100 p-2 rounded text-center">
                        <div className="text-sm font-semibold text-yellow-700">Out-of-State: {mockAcademicData.admissions.demographics.domicile.outOfState}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Program-wise Admissions */}
          <Card>
            <CardHeader>
              <CardTitle>Confirmed Admissions by Program</CardTitle>
              <CardDescription>Distribution of confirmed admissions across programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAcademicData.admissions.confirmedAdmissions.byProgram.map((program, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{program.program}</span>
                        <span className="text-sm text-gray-600">{program.percentage}%</span>
                      </div>
                      <Progress value={program.percentage} className="h-2" />
                    </div>
                    <div className="ml-4 text-right">
                      <div className="font-semibold">{formatNumber(program.count)}</div>
                      <div className="text-xs text-gray-500">students</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Examinations Tab */}
        <TabsContent value="examinations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Exams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Exam Schedule
                </CardTitle>
                <CardDescription>Next scheduled examinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAcademicData.examinations.upcomingExams.map((exam, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <div className="font-medium">{exam.subject}</div>
                        <div className="text-sm text-gray-600">{exam.date} • {exam.time}</div>
                        <div className="text-xs text-gray-500">{exam.hall}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">{exam.students}</div>
                        <div className="text-xs text-gray-500">students</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Exam Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Examination Statistics
                </CardTitle>
                <CardDescription>Registration and hall ticket status</CardDescription>
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

          {/* Grade Distribution */}
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

        {/* Academic Records Tab */}
        <TabsContent value="academic-records" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Profiles Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Student Profiles Status
                </CardTitle>
                <CardDescription>Profile completion and data quality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-600 font-medium">Total Active Students</div>
                    <div className="text-2xl font-bold text-green-700">{formatNumber(mockAcademicData.academicRecords.totalActiveStudents)}</div>
                    <div className="text-xs text-green-500">Across all programs</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="text-sm text-orange-600 font-medium">Incomplete</div>
                      <div className="text-2xl font-bold text-orange-700">{mockAcademicData.academicRecords.incompleteProfiles}</div>
                      <div className="text-xs text-orange-500">Profiles</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="text-sm text-red-600 font-medium">Outdated</div>
                      <div className="text-2xl font-bold text-red-700">{mockAcademicData.academicRecords.outdatedProfiles}</div>
                      <div className="text-xs text-red-500">Profiles</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Strength */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Department-wise Strength
                </CardTitle>
                <CardDescription>Current strength vs capacity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAcademicData.academicRecords.departmentStrength.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{dept.department}</span>
                        <span className="text-sm text-gray-600">{dept.utilization}%</span>
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

          {/* Course-wise Student Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Students by Course and Year</CardTitle>
              <CardDescription>Year-wise distribution across different courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-center">Year 1</TableHead>
                    <TableHead className="text-center">Year 2</TableHead>
                    <TableHead className="text-center">Year 3</TableHead>
                    <TableHead className="text-center">Year 4</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAcademicData.academicRecords.byCourse.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{course.course}</TableCell>
                      <TableCell className="text-center">{course.year1}</TableCell>
                      <TableCell className="text-center">{course.year2}</TableCell>
                      <TableCell className="text-center">{course.year3 || '-'}</TableCell>
                      <TableCell className="text-center">{course.year4 || '-'}</TableCell>
                      <TableCell className="text-center font-semibold">
                        {course.year1 + course.year2 + course.year3 + course.year4}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <CardTitle>Alerts & Notifications</CardTitle>
                <CardDescription>Important academic alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-yellow-800">Exam Schedule Conflict</div>
                        <div className="text-xs text-yellow-600">2 exams scheduled at same time slot</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border border-red-200 bg-red-50">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-red-800">Missing Documents</div>
                        <div className="text-xs text-red-600">89 students have incomplete documentation</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="flex items-start gap-2">
                      <Bell className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-blue-800">Registration Deadline</div>
                        <div className="text-xs text-blue-600">Next semester registration ends in 5 days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
