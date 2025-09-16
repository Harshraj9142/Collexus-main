"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Building2,
  Bed,
  Users,
  UserCheck,
  Clock,
  AlertTriangle,
  IndianRupee,
  Wrench,
  FileText,
  Calendar,
  Download,
  RefreshCw,
  Home,
  User,
  BedDouble,
  UserX,
  CreditCard,
  Settings,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

// Mock data for hostel dashboard
const mockHostelData = {
  occupancy: {
    totalCapacity: 2400,
    currentOccupancy: 2156,
    occupancyRate: 89.8,
    availableBeds: 244,
    genderAllocation: {
      male: { occupied: 1298, capacity: 1440, rate: 90.1 },
      female: { occupied: 858, capacity: 960, rate: 89.4 }
    },
    hostelWise: [
      { name: "Block A (Boys)", capacity: 480, occupied: 445, available: 35, type: "Male" },
      { name: "Block B (Boys)", capacity: 480, occupied: 432, available: 48, type: "Male" },
      { name: "Block C (Boys)", capacity: 480, occupied: 421, available: 59, type: "Male" },
      { name: "Block D (Girls)", capacity: 480, occupied: 428, available: 52, type: "Female" },
      { name: "Block E (Girls)", capacity: 480, occupied: 430, available: 50, type: "Female" }
    ],
    roomTypes: [
      { type: "Single AC", capacity: 120, occupied: 118, rate: 98.3 },
      { type: "Single Non-AC", capacity: 240, occupied: 228, rate: 95.0 },
      { type: "Double AC", capacity: 480, occupied: 456, rate: 95.0 },
      { type: "Double Non-AC", capacity: 960, occupied: 842, rate: 87.7 },
      { type: "Triple Sharing", capacity: 600, occupied: 512, rate: 85.3 }
    ]
  },
  allocation: {
    pendingRequests: 67,
    newAdmissions: 89,
    awaitingAssignment: 34,
    duesNonPayment: 23,
    recentRequests: [
      { id: "HR001", name: "Rahul Kumar", course: "B.Tech CSE", year: "1st", requestDate: "2024-01-15", status: "pending" },
      { id: "HR002", name: "Priya Sharma", course: "MBA", year: "1st", requestDate: "2024-01-14", status: "approved" },
      { id: "HR003", name: "Amit Singh", course: "M.Tech ECE", year: "2nd", requestDate: "2024-01-13", status: "pending" },
      { id: "HR004", name: "Sneha Patel", course: "BBA", year: "2nd", requestDate: "2024-01-12", status: "rejected" }
    ]
  },
  finances: {
    totalCollection: 18450000,
    targetCollection: 21600000,
    collectionRate: 85.4,
    pendingFees: 3150000,
    pendingDeposits: 245000,
    pendingRefunds: 89000,
    monthlyBreakdown: [
      { month: "Apr", collected: 2100000, target: 2400000 },
      { month: "May", collected: 2250000, target: 2400000 },
      { month: "Jun", collected: 2180000, target: 2400000 },
      { month: "Jul", collected: 2320000, target: 2400000 },
      { month: "Aug", collected: 2200000, target: 2400000 },
      { month: "Sep", collected: 2150000, target: 2400000 }
    ]
  },
  operations: {
    totalRooms: 1200,
    vacantRooms: 122,
    underMaintenance: 22,
    availableRooms: 100,
    complaints: {
      total: 45,
      maintenance: 28,
      facilities: 17,
      resolved: 32,
      pending: 13
    },
    upcomingRenewals: [
      { vendor: "Mess Services", contract: "Food Supply", expiry: "2024-03-31", value: "₹2.4L/month" },
      { vendor: "Cleaning Services", contract: "Housekeeping", expiry: "2024-04-15", value: "₹1.8L/month" },
      { vendor: "Security Services", contract: "24x7 Security", expiry: "2024-05-30", value: "₹3.2L/month" }
    ]
  }
}

export function HostelDashboard() {
  const [activeTab, setActiveTab] = useState("occupancy")
  const [selectedHostel, setSelectedHostel] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hostel Administration</h1>
          <p className="text-muted-foreground">
            Comprehensive hostel management and operations dashboard
          </p>
        </div>
        <div className="flex items-center space-x-2">
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

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Occupancy</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {mockHostelData.occupancy.currentOccupancy}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Progress value={mockHostelData.occupancy.occupancyRate} className="flex-1" />
              <span className="text-xs text-blue-700">{mockHostelData.occupancy.occupancyRate}%</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              of {mockHostelData.occupancy.totalCapacity} capacity
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Available Beds</CardTitle>
            <Bed className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {mockHostelData.occupancy.availableBeds}
            </div>
            <p className="text-xs text-green-600">
              Ready for allocation
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {mockHostelData.allocation.pendingRequests}
            </div>
            <p className="text-xs text-orange-600">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Fee Collection</CardTitle>
            <IndianRupee className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {mockHostelData.finances.collectionRate}%
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Progress value={mockHostelData.finances.collectionRate} className="flex-1" />
            </div>
            <p className="text-xs text-purple-600 mt-1">
              ₹{(mockHostelData.finances.totalCollection / 10000000).toFixed(1)}Cr collected
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="occupancy" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Occupancy</span>
          </TabsTrigger>
          <TabsTrigger value="allocation" className="flex items-center space-x-2">
            <UserCheck className="h-4 w-4" />
            <span>Allocation</span>
          </TabsTrigger>
          <TabsTrigger value="finances" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Finances</span>
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Operations</span>
          </TabsTrigger>
        </TabsList>

        {/* Occupancy Tab */}
        <TabsContent value="occupancy" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Capacity Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Capacity Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Capacity</span>
                    <span className="font-medium">{mockHostelData.occupancy.totalCapacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current Occupancy</span>
                    <span className="font-medium">{mockHostelData.occupancy.currentOccupancy}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available Beds</span>
                    <span className="font-medium text-green-600">{mockHostelData.occupancy.availableBeds}</span>
                  </div>
                  <Progress value={mockHostelData.occupancy.occupancyRate} className="mt-2" />
                  <p className="text-center text-sm text-muted-foreground">
                    {mockHostelData.occupancy.occupancyRate}% Occupied
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Gender-wise Allocation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Gender-wise Allocation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Male Students</span>
                      <span className="text-sm font-medium">
                        {mockHostelData.occupancy.genderAllocation.male.occupied}/{mockHostelData.occupancy.genderAllocation.male.capacity}
                      </span>
                    </div>
                    <Progress value={mockHostelData.occupancy.genderAllocation.male.rate} />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockHostelData.occupancy.genderAllocation.male.rate}% occupied
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Female Students</span>
                      <span className="text-sm font-medium">
                        {mockHostelData.occupancy.genderAllocation.female.occupied}/{mockHostelData.occupancy.genderAllocation.female.capacity}
                      </span>
                    </div>
                    <Progress value={mockHostelData.occupancy.genderAllocation.female.rate} />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockHostelData.occupancy.genderAllocation.female.rate}% occupied
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hostel-wise Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Hostel-wise Occupancy</CardTitle>
              <CardDescription>Detailed breakdown by hostel blocks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hostel Block</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Occupied</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Occupancy Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHostelData.occupancy.hostelWise.map((hostel, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{hostel.name}</TableCell>
                      <TableCell>
                        <Badge variant={hostel.type === 'Male' ? 'default' : 'secondary'}>
                          {hostel.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{hostel.capacity}</TableCell>
                      <TableCell>{hostel.occupied}</TableCell>
                      <TableCell className="text-green-600">{hostel.available}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={(hostel.occupied / hostel.capacity) * 100} className="w-16" />
                          <span className="text-sm">
                            {((hostel.occupied / hostel.capacity) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Room Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Room Type Distribution</CardTitle>
              <CardDescription>Occupancy by room categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockHostelData.occupancy.roomTypes.map((room, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{room.type}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Occupied</span>
                          <span className="font-medium">{room.occupied}/{room.capacity}</span>
                        </div>
                        <Progress value={room.rate} />
                        <p className="text-xs text-center text-muted-foreground">
                          {room.rate}% occupied
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Allocation Tab */}
        <TabsContent value="allocation" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-yellow-800">Pending Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-900">{mockHostelData.allocation.pendingRequests}</div>
                <p className="text-xs text-yellow-600">Awaiting approval</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-800">New Admissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{mockHostelData.allocation.newAdmissions}</div>
                <p className="text-xs text-blue-600">Need room assignment</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-red-800">Dues Non-Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-900">{mockHostelData.allocation.duesNonPayment}</div>
                <p className="text-xs text-red-600">Flagged students</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Hostel Requests</CardTitle>
              <CardDescription>Latest applications and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHostelData.allocation.recentRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.course}</TableCell>
                      <TableCell>{request.year}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            request.status === 'approved' ? 'default' : 
                            request.status === 'pending' ? 'secondary' : 'destructive'
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {request.status === 'pending' && (
                            <>
                              <Button size="sm" variant="outline">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4" />
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

        {/* Finances Tab */}
        <TabsContent value="finances" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-green-800">Total Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">
                  ₹{(mockHostelData.finances.totalCollection / 10000000).toFixed(1)}Cr
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Progress value={mockHostelData.finances.collectionRate} className="flex-1" />
                  <span className="text-xs text-green-700">{mockHostelData.finances.collectionRate}%</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  of ₹{(mockHostelData.finances.targetCollection / 10000000).toFixed(1)}Cr target
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-800">Pending Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">
                  ₹{(mockHostelData.finances.pendingDeposits / 100000).toFixed(1)}L
                </div>
                <p className="text-xs text-orange-600">Security deposits</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-purple-800">Pending Refunds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">
                  ₹{(mockHostelData.finances.pendingRefunds / 1000).toFixed(0)}K
                </div>
                <p className="text-xs text-purple-600">To be processed</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Fee Collection Trend</CardTitle>
              <CardDescription>Collection vs target over months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHostelData.finances.monthlyBreakdown.map((month, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{month.month} 2024</span>
                      <span className="text-sm">
                        ₹{(month.collected / 100000).toFixed(1)}L / ₹{(month.target / 100000).toFixed(1)}L
                      </span>
                    </div>
                    <Progress value={(month.collected / month.target) * 100} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{((month.collected / month.target) * 100).toFixed(1)}% achieved</span>
                      <span>₹{((month.target - month.collected) / 100000).toFixed(1)}L pending</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-800">Total Rooms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{mockHostelData.operations.totalRooms}</div>
                <p className="text-xs text-blue-600">Across all blocks</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-green-800">Available Rooms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">{mockHostelData.operations.availableRooms}</div>
                <p className="text-xs text-green-600">Ready for allocation</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-yellow-800">Under Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-900">{mockHostelData.operations.underMaintenance}</div>
                <p className="text-xs text-yellow-600">Being repaired</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-red-800">Total Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-900">{mockHostelData.operations.complaints.total}</div>
                <p className="text-xs text-red-600">{mockHostelData.operations.complaints.pending} pending</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Complaints Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Maintenance Issues</span>
                    <Badge variant="secondary">{mockHostelData.operations.complaints.maintenance}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Facility Issues</span>
                    <Badge variant="secondary">{mockHostelData.operations.complaints.facilities}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resolved</span>
                    <Badge variant="default">{mockHostelData.operations.complaints.resolved}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending</span>
                    <Badge variant="destructive">{mockHostelData.operations.complaints.pending}</Badge>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resolution Rate</span>
                    <span>{((mockHostelData.operations.complaints.resolved / mockHostelData.operations.complaints.total) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(mockHostelData.operations.complaints.resolved / mockHostelData.operations.complaints.total) * 100} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Upcoming Contract Renewals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockHostelData.operations.upcomingRenewals.map((renewal, index) => (
                    <div key={index} className="border rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{renewal.vendor}</p>
                          <p className="text-xs text-muted-foreground">{renewal.contract}</p>
                        </div>
                        <Badge variant="outline">{renewal.value}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-xs">Expires: {renewal.expiry}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
