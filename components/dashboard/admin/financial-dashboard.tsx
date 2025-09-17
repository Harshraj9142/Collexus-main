"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Receipt, 
  CreditCard, 
  Users, 
  Calendar,
  FileText,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Filter,
  Search,
  Bell
} from 'lucide-react'

// Mock data - in real app this would come from API
const mockFinancialData = {
  feeCollection: {
    totalCollected: 2850000,
    target: 3200000,
    outstanding: 350000,
    pendingPayments: 125,
    breakdown: [
      { category: 'Tuition Fees', amount: 2100000, percentage: 73.7 },
      { category: 'Hostel Fees', amount: 420000, percentage: 14.7 },
      { category: 'Lab Fees', amount: 180000, percentage: 6.3 },
      { category: 'Library Fees', amount: 90000, percentage: 3.2 },
      { category: 'Other Fees', amount: 60000, percentage: 2.1 }
    ]
  },
  transactions: {
    totalTransactions: 1247,
    receiptsGenerated: 1122,
    refundsProcessed: 23,
    scholarshipsAwarded: 45,
    penaltiesCollected: 57,
    recentTransactions: [
      { id: 'TXN001', student: 'John Doe', amount: 15000, type: 'Fee Payment', status: 'Completed', date: '2024-01-15' },
      { id: 'TXN002', student: 'Jane Smith', amount: 5000, type: 'Refund', status: 'Processing', date: '2024-01-15' },
      { id: 'TXN003', student: 'Mike Johnson', amount: 500, type: 'Late Fee', status: 'Completed', date: '2024-01-14' },
      { id: 'TXN004', student: 'Sarah Wilson', amount: 20000, type: 'Scholarship', status: 'Approved', date: '2024-01-14' },
      { id: 'TXN005', student: 'David Brown', amount: 12000, type: 'Fee Payment', status: 'Completed', date: '2024-01-13' }
    ]
  },
  financialHealth: {
    revenueVsTarget: {
      current: 2850000,
      target: 3200000,
      percentage: 89.1
    },
    departmentContribution: [
      { department: 'Engineering', contribution: 1200000, percentage: 42.1 },
      { department: 'Business', contribution: 800000, percentage: 28.1 },
      { department: 'Arts & Sciences', contribution: 500000, percentage: 17.5 },
      { department: 'Medicine', contribution: 350000, percentage: 12.3 }
    ],
    alerts: [
      { id: 1, type: 'deadline', message: 'Fee payment deadline approaching for 45 students', severity: 'warning', date: '2024-01-20' },
      { id: 2, type: 'overdue', message: '23 students have unpaid dues >30 days', severity: 'error', date: '2024-01-15' },
      { id: 3, type: 'target', message: 'Monthly collection target 89% achieved', severity: 'info', date: '2024-01-15' }
    ]
  },
  additionalMetrics: {
    averagePaymentTime: 5.2,
    collectionEfficiency: 94.5,
    defaultRate: 2.1,
    scholarshipUtilization: 78.3
  }
}

export function FinancialDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('monthly')
  const [data, setData] = useState(mockFinancialData)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-5 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-gray-600 text-lg mt-1">Comprehensive financial management and analytics</p>
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
            <CardTitle className="text-sm font-medium text-blue-800">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{formatCurrency(data.feeCollection.totalCollected)}</div>
            <p className="text-xs text-blue-600 mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Collection Rate</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{data.financialHealth.revenueVsTarget.percentage}%</div>
            <Progress value={data.financialHealth.revenueVsTarget.percentage} className="mt-2" />
            <p className="text-xs text-green-600 mt-1">Target: {formatCurrency(data.feeCollection.target)}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Outstanding Dues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{formatCurrency(data.feeCollection.outstanding)}</div>
            <p className="text-xs text-orange-600 mt-1">
              {data.feeCollection.pendingPayments} pending payments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{data.transactions.totalTransactions}</div>
            <p className="text-xs text-purple-600 mt-1">
              <CheckCircle className="h-3 w-3 inline mr-1" />
              {data.transactions.receiptsGenerated} receipts generated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="fee-collection" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fee-collection">Fee Collection</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="financial-health">Financial Health</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Fee Collection Tab */}
        <TabsContent value="fee-collection" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fee Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Fee Collection Breakdown
                </CardTitle>
                <CardDescription>Distribution of collected fees by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.feeCollection.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-gray-600">{item.percentage}%</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                      <div className="ml-4 text-right">
                        <div className="font-semibold">{formatCurrency(item.amount)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Outstanding Dues Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Outstanding Dues Analysis
                </CardTitle>
                <CardDescription>Detailed breakdown of pending payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="text-sm text-red-600 font-medium">Overdue (&gt;30 days)</div>
                      <div className="text-2xl font-bold text-red-700">₹1,25,000</div>
                      <div className="text-xs text-red-500">23 students</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="text-sm text-yellow-600 font-medium">Due Soon (7 days)</div>
                      <div className="text-2xl font-bold text-yellow-700">₹2,25,000</div>
                      <div className="text-xs text-yellow-500">45 students</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-600 font-medium">Total Outstanding</div>
                    <div className="text-2xl font-bold text-blue-700">{formatCurrency(data.feeCollection.outstanding)}</div>
                    <div className="text-xs text-blue-500">{data.feeCollection.pendingPayments} total pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transaction Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Summary</CardTitle>
                <CardDescription>Overview of all financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Receipts Generated</span>
                    </div>
                    <span className="font-bold text-green-700">{data.transactions.receiptsGenerated}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Refunds Processed</span>
                    </div>
                    <span className="font-bold text-blue-700">{data.transactions.refundsProcessed}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Scholarships Awarded</span>
                    </div>
                    <span className="font-bold text-purple-700">{data.transactions.scholarshipsAwarded}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Penalties Collected</span>
                    </div>
                    <span className="font-bold text-orange-700">{data.transactions.penaltiesCollected}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Transactions</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>Latest financial transactions and receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.transactions.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Receipt className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{transaction.student}</div>
                          <div className="text-sm text-gray-600">{transaction.type} • {transaction.id}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(transaction.amount)}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Health Tab */}
        <TabsContent value="financial-health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Target */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Revenue vs Target
                </CardTitle>
                <CardDescription>Monthly revenue performance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {data.financialHealth.revenueVsTarget.percentage}%
                    </div>
                    <div className="text-sm text-gray-600">Target Achievement</div>
                  </div>
                  <Progress value={data.financialHealth.revenueVsTarget.percentage} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-green-600">
                        {formatCurrency(data.financialHealth.revenueVsTarget.current)}
                      </div>
                      <div className="text-xs text-gray-600">Current Revenue</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-600">
                        {formatCurrency(data.financialHealth.revenueVsTarget.target)}
                      </div>
                      <div className="text-xs text-gray-600">Target Revenue</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Contribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Department Contribution
                </CardTitle>
                <CardDescription>Revenue contribution by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.financialHealth.departmentContribution.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{dept.department}</span>
                        <span className="text-sm text-gray-600">{dept.percentage}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={dept.percentage} className="flex-1 h-2" />
                        <span className="text-sm font-semibold min-w-0">
                          {formatCurrency(dept.contribution)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts and Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Financial Alerts & Notifications
              </CardTitle>
              <CardDescription>Important financial alerts and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.financialHealth.alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {alert.severity === 'error' && <XCircle className="h-5 w-5 text-red-600 mt-0.5" />}
                        {alert.severity === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />}
                        {alert.severity === 'info' && <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />}
                        <div>
                          <div className="font-medium">{alert.message}</div>
                          <div className="text-sm opacity-75 mt-1">{alert.date}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-indigo-800">Avg Payment Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-900">{data.additionalMetrics.averagePaymentTime} days</div>
                <p className="text-xs text-indigo-600 mt-1">
                  <TrendingDown className="h-3 w-3 inline mr-1" />
                  -0.8 days from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-teal-800">Collection Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-900">{data.additionalMetrics.collectionEfficiency}%</div>
                <p className="text-xs text-teal-600 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-rose-800">Default Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-900">{data.additionalMetrics.defaultRate}%</div>
                <p className="text-xs text-rose-600 mt-1">
                  <TrendingDown className="h-3 w-3 inline mr-1" />
                  -0.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-amber-800">Scholarship Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">{data.additionalMetrics.scholarshipUtilization}%</div>
                <p className="text-xs text-amber-600 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +5.2% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Analytics Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods Analysis</CardTitle>
                <CardDescription>Distribution of payment methods used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Online Banking</span>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-20 h-2" />
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">UPI/Digital Wallet</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-20 h-2" />
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cash/Cheque</span>
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="w-20 h-2" />
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Forecasting</CardTitle>
                <CardDescription>Projected revenue for next quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₹9,85,00,000</div>
                    <div className="text-sm text-gray-600">Projected Q2 Revenue</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold text-blue-600">April</div>
                      <div className="text-gray-600">₹3.2Cr</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-600">May</div>
                      <div className="text-gray-600">₹3.3Cr</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-600">June</div>
                      <div className="text-gray-600">₹3.35Cr</div>
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
