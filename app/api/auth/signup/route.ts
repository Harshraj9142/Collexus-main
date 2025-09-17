import { NextRequest, NextResponse } from 'next/server'
import { UserInput, UserRole, AdminSubRole, FacultySubRole } from '@/lib/models/User'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role, adminSubRole } = body
    // Normalize faculty sub-role from various possible casings/keys and values
    const rawFacultySubRole: unknown =
      body?.FacultySubRole ?? body?.facultySubRole ?? body?.FACULTY_SUB_ROLE
    const FacultySubRole =
      typeof rawFacultySubRole === 'string' ? (rawFacultySubRole as string).toLowerCase() : undefined
    
    console.log('Signup request body:', { name, email, role, adminSubRole, FacultySubRole })
    console.log('Request body keys:', Object.keys(body))
    console.log('Full body:', body)

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

    // Validate admin sub-role if role is admin
    if (role === 'admin') {
      const validAdminSubRoles: AdminSubRole[] = ['financial', 'academic', 'hostel', 'library']
      if (!adminSubRole || !validAdminSubRoles.includes(adminSubRole)) {
        return NextResponse.json(
          { error: 'Valid admin sub-role is required for admin users' },
          { status: 400 }
        )
      }
    }

    // Validate faculty sub-role if role is faculty
    if (role === 'faculty') {
      console.log('Faculty validation - FacultySubRole (normalized):', FacultySubRole)
      const validFacultySubRoles: FacultySubRole[] = ['hod', 'assistant_hod', 'professor']
      if (!FacultySubRole || !validFacultySubRoles.includes(FacultySubRole as FacultySubRole)) {
        console.log('Faculty validation failed - FacultySubRole:', FacultySubRole, 'Valid roles:', validFacultySubRoles)
        return NextResponse.json(
          { error: 'Valid faculty sub-role is required for faculty users' },
          { status: 400 }
        )
      }
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
        adminSubRole: role === 'admin' ? adminSubRole : undefined,
        FacultySubRole: role === 'faculty' ? (FacultySubRole as FacultySubRole) : undefined,
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
            adminSubRole: role === 'admin' ? adminSubRole : undefined,
            FacultySubRole: role === 'faculty' ? (FacultySubRole as FacultySubRole) : undefined,
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
