"use client"

import { useState, useEffect } from 'react'
import { useSocket } from '@/components/providers/socket-provider'

interface StudentCountData {
  count: number
  timestamp: string
}

export function useStudentCount() {
  const [studentCount, setStudentCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { socket, isConnected } = useSocket()

  // Fetch initial student count
  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/students/count')
        const data = await response.json()
        
        if (data.success) {
          setStudentCount(data.count)
          setError(null)
        } else {
          setError(data.error || 'Failed to fetch student count')
        }
      } catch (err) {
        setError('Failed to fetch student count')
        console.error('Error fetching student count:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudentCount()
  }, [])

  // Set up real-time updates via Socket.IO
  useEffect(() => {
    if (socket && isConnected) {
      // Join admin room for real-time updates
      socket.emit('join-admin')

      // Listen for student count updates
      socket.on('student-count-update', (data: StudentCountData) => {
        console.log('Received student count update:', data)
        setStudentCount(data.count)
        setError(null)
      })

      return () => {
        socket.off('student-count-update')
        socket.emit('leave-admin')
      }
    }
  }, [socket, isConnected])

  return {
    studentCount,
    isLoading,
    error,
    isConnected
  }
}
