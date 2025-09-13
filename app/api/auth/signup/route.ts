import { NextRequest, NextResponse } from 'next/server'
import { UserInput, UserRole } from '@/lib/models/User'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role } = body

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate role
    const validRoles: UserRole[] = ['student', 'faculty', 'admin', 'parent']
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    try {
      // Try MongoDB first
      const { getMongoClientPromise } = await import('@/lib/mongodb')
      const { UserModel } = await import('@/lib/models/User')
      
      const client = await getMongoClientPromise()
      const db = client.db(process.env.DATABASE_NAME || 'collexus')
      const userModel = new UserModel(db)

      // Check if user already exists
      const existingUser = await userModel.findUserByEmail(email)
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }

      // Create new user
      const userData: UserInput = {
        name,
        email,
        password,
        role,
      }

      const newUser = await userModel.createUser(userData)

      // Emit real-time update if user is a student
      if (role === 'student') {
        try {
          const { emitStudentCountUpdate } = await import('@/lib/socket')
          await emitStudentCountUpdate()
        } catch (socketError) {
          console.log('Socket.IO not available for real-time updates:', socketError)
        }
      }

      // Return user without password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...userWithoutPassword } = newUser

      return NextResponse.json(
        { 
          message: 'User created successfully',
          user: userWithoutPassword 
        },
        { status: 201 }
      )
    } catch (mongoError) {
      console.log('MongoDB not available for signup:', mongoError instanceof Error ? mongoError.message : 'Unknown error')
      
      // For development without MongoDB, return success but don't actually create user
      return NextResponse.json(
        { 
          message: 'Signup successful (demo mode - MongoDB not available)',
          user: {
            id: 'demo-' + Date.now(),
            name,
            email,
            role,
            avatar: null
          }
        },
        { status: 201 }
      )
    }

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
