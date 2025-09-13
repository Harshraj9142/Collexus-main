import { Server as NetServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'
import { connectToDatabase } from '@/lib/db'

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: ServerIO
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

let io: ServerIO | null = null

export const getSocketIO = () => io

export const initializeSocket = (server: NetServer) => {
  if (!io) {
    io = new ServerIO(server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    })

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)

      // Join admin room for real-time updates
      socket.on('join-admin', () => {
        socket.join('admin-dashboard')
        console.log(`Socket ${socket.id} joined admin-dashboard room`)
      })

      // Leave admin room
      socket.on('leave-admin', () => {
        socket.leave('admin-dashboard')
        console.log(`Socket ${socket.id} left admin-dashboard room`)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })
  }

  return io
}

// Function to emit student count updates to admin dashboard
export const emitStudentCountUpdate = async () => {
  if (io) {
    try {
      const { db } = await connectToDatabase()
      const studentCount = await db.collection('users').countDocuments({ role: 'student' })
      
      io.to('admin-dashboard').emit('student-count-update', {
        count: studentCount,
        timestamp: new Date().toISOString()
      })
      
      console.log('Emitted student count update:', studentCount)
    } catch (error) {
      console.error('Error emitting student count update:', error)
    }
  }
}
