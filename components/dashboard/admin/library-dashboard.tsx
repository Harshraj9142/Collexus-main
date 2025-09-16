"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Users,
  Calendar,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  FileText,
  Search,
  Plus,
  Download,
  Upload,
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

// Mock data for library dashboard
const mockLibraryData = {
  stats: {
    totalBooks: 15420,
    availableBooks: 12850,
    issuedBooks: 2570,
    overdueBooks: 145,
    activeStudents: 1247,
    totalFines: 8950,
    booksAddedThisMonth: 89,
  },
  bookCategories: [
    { name: "Computer Science", count: 3200, color: "#3b82f6" },
    { name: "Mathematics", count: 2800, color: "#10b981" },
    { name: "Physics", count: 2100, color: "#f59e0b" },
    { name: "Literature", count: 1900, color: "#ef4444" },
    { name: "Engineering", count: 2400, color: "#8b5cf6" },
    { name: "Others", count: 3020, color: "#6b7280" },
  ],
  monthlyCirculation: [
    { month: "Jan", issued: 450, returned: 420 },
    { month: "Feb", issued: 520, returned: 480 },
    { month: "Mar", issued: 380, returned: 410 },
    { month: "Apr", issued: 670, returned: 620 },
    { month: "May", issued: 430, returned: 450 },
    { month: "Jun", issued: 590, returned: 560 },
  ],
  recentActivity: [
    {
      id: 1,
      type: "issue",
      student: "John Smith",
      book: "Data Structures and Algorithms",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "return",
      student: "Sarah Johnson",
      book: "Linear Algebra",
      time: "3 hours ago",
    },
    {
      id: 3,
      type: "overdue",
      student: "Mike Wilson",
      book: "Database Systems",
      daysOverdue: 5,
      time: "1 day ago",
    },
  ],
  notifications: [
    {
      id: 1,
      title: "Books Due Today",
      message: "25 books are due for return today",
      type: "warning",
      time: "1 hour ago",
    },
    {
      id: 2,
      title: "New Books Added",
      message: "15 new Computer Science books added to catalog",
      type: "info",
      time: "2 hours ago",
    },
    {
      id: 3,
      title: "Fine Collection",
      message: "₹2,450 collected in fines today",
      type: "success",
      time: "4 hours ago",
    },
  ],
}

export function LibraryDashboard() {
  const { data: session } = useSession()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const availabilityPercentage = Math.round((mockLibraryData.stats.availableBooks / mockLibraryData.stats.totalBooks) * 100)
  const overduePercentage = Math.round((mockLibraryData.stats.overdueBooks / mockLibraryData.stats.issuedBooks) * 100)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Library Admin Dashboard</h1>
        <p className="text-muted-foreground text-pretty">
          Welcome, {session?.user?.name}! Manage library operations, track book circulation, and monitor student activities.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLibraryData.stats.totalBooks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{mockLibraryData.stats.booksAddedThisMonth} added this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Books</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLibraryData.stats.availableBooks.toLocaleString()}</div>
            <Progress value={availabilityPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {availabilityPercentage}% of total collection
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books Due Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLibraryData.stats.overdueBooks}</div>
            <p className="text-xs text-muted-foreground">
              {overduePercentage}% of issued books
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Fines</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockLibraryData.stats.totalFines.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From {mockLibraryData.stats.activeStudents} students</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="issue-return">Issue/Return</TabsTrigger>
          <TabsTrigger value="fines">Fines</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Alerts</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Book Collection by Category</CardTitle>
                <CardDescription>Distribution of books across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockLibraryData.bookCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {mockLibraryData.bookCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value} books`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {mockLibraryData.bookCategories.map((entry, index) => (
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
                <CardTitle>Recent Library Activity</CardTitle>
                <CardDescription>Latest book transactions and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLibraryData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === "issue" && <BookOpen className="h-4 w-4 text-blue-500" />}
                        {activity.type === "return" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {activity.type === "overdue" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.student}</p>
                        <p className="text-sm text-muted-foreground">{activity.book}</p>
                        {activity.type === "overdue" && (
                          <Badge variant="destructive" className="mt-1">
                            {activity.daysOverdue} days overdue
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Circulation Trends</CardTitle>
              <CardDescription>Book issue and return patterns over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockLibraryData.monthlyCirculation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="issued"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Books Issued"
                  />
                  <Line
                    type="monotone"
                    dataKey="returned"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Books Returned"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder tabs - will be implemented in subsequent components */}
        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Book Management</CardTitle>
              <CardDescription>Add, edit, and manage your library collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Book
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Books
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Catalog
                </Button>
              </div>
              <p className="text-muted-foreground">Book management features will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Library Management</CardTitle>
              <CardDescription>Manage student library accounts and borrowing history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Student management features will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issue-return" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Issue & Return Books</CardTitle>
              <CardDescription>Process book transactions and manage due dates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Issue and return functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fines & Payments</CardTitle>
              <CardDescription>Manage overdue fines and payment collection</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Fines and payment features will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>Generate detailed reports and view library analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Reports and analytics will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Library Notifications & Alerts
              </CardTitle>
              <CardDescription>Important alerts and system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLibraryData.notifications.map((notification) => (
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Controls</CardTitle>
              <CardDescription>System administration and audit controls</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Admin controls and audit logs will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
