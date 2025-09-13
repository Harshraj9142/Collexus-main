"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStudentCount } from '@/hooks/use-student-count'
import { Loader2, Users, Wifi, WifiOff } from 'lucide-react'

export function StudentCountTest() {
  const { studentCount, isLoading, error, isConnected } = useStudentCount()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'password123'
  })

  const handleCreateStudent = async () => {
    if (!formData.name || !formData.email) return

    setIsCreating(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'student'
        }),
      })

      const result = await response.json()
      
      if (response.ok) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: 'password123'
        })
        console.log('Student created successfully:', result)
      } else {
        console.error('Error creating student:', result.error)
      }
    } catch (error) {
      console.error('Error creating student:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Real-time Student Count
          </CardTitle>
          <CardDescription>
            Current count updates automatically when new students register
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Loading...
                  </div>
                ) : error ? (
                  <span className="text-red-500">Error</span>
                ) : (
                  studentCount.toLocaleString()
                )}
              </div>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500">Live</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-red-500">Offline</span>
                </>
              )}
            </div>
          </div>
          
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-600">
              {isConnected 
                ? "✅ Real-time updates are active. The count will update automatically when new students register."
                : "⚠️ Real-time updates are not connected. Count will only update on page refresh."
              }
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Student Registration</CardTitle>
          <CardDescription>
            Create a test student to see real-time count updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Student Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter student name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="student@example.com"
            />
          </div>
          
          <Button 
            onClick={handleCreateStudent}
            disabled={isCreating || !formData.name || !formData.email}
            className="w-full"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Student...
              </>
            ) : (
              'Create Test Student'
            )}
          </Button>
          
          <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-sm text-yellow-700">
              💡 After creating a student, watch the count update in real-time on the left card!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
