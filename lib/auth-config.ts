import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { UserRole, AdminSubRole } from './models/User'
import bcrypt from 'bcryptjs'

// Demo users for development when MongoDB is not available
const demoUsers = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@demo.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K5K5K2', // password: student123
    role: 'student' as UserRole,
    avatar: '/student-avatar.png'
  },
  {
    id: '2',
    name: 'Dr. Smith',
    email: 'faculty@demo.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K5K5K2', // password: faculty123
    role: 'faculty' as UserRole,
    avatar: '/professor-avatar.png'
  },
  {
    id: '3',
    name: 'Financial Admin',
    email: 'admin@demo.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K5K5K2', // password: admin123
    role: 'admin' as UserRole,
    adminSubRole: 'financial' as AdminSubRole,
    avatar: '/admin-avatar.png'
  },
  {
    id: '5',
    name: 'Academic Admin',
    email: 'academic@demo.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K5K5K2', // password: admin123
    role: 'admin' as UserRole,
    adminSubRole: 'academic' as AdminSubRole,
    avatar: '/admin-avatar.png'
  },
  {
    id: '6',
    name: 'Hostel Admin',
    email: 'hostel@demo.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K5K5K2', // password: admin123
    role: 'admin' as UserRole,
    adminSubRole: 'hostel' as AdminSubRole,
    avatar: '/admin-avatar.png'
  },
  {
    id: '4',
    name: 'Parent User',
    email: 'parent@demo.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K5K5K2', // password: parent123
    role: 'parent' as UserRole,
    avatar: '/parent-avatar.png'
  }
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
        adminSubRole: { label: 'Admin Sub Role', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.role) {
          return null
        }

        try {
          // Try MongoDB first
          try {
            const { getMongoClientPromise } = await import('./mongodb')
            const { UserModel } = await import('./models/User')
            const client = await getMongoClientPromise()
            const db = client.db(process.env.DATABASE_NAME || 'collexus')
            const userModel = new UserModel(db)

            const user = await userModel.findUserByEmail(credentials.email)
            
            if (!user) {
              return null
            }

            const isValidPassword = await userModel.validatePassword(user, credentials.password)
            
            if (!isValidPassword) {
              return null
            }

            // Check if user role matches the selected role
            if (user.role !== credentials.role) {
              return null
            }

            // For admin users, also check admin sub-role
            if (user.role === 'admin' && credentials.adminSubRole) {
              if (user.adminSubRole !== credentials.adminSubRole) {
                return null
              }
            }

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              adminSubRole: user.adminSubRole,
              avatar: user.avatar,
            }
          } catch (mongoError) {
            console.log('MongoDB not available, using demo users:', mongoError instanceof Error ? mongoError.message : 'Unknown error')
            
            // Fallback to demo users
            let user = demoUsers.find(u => u.email === credentials.email && u.role === credentials.role)
            
            // For admin users, also match admin sub-role
            if (credentials.role === 'admin' && credentials.adminSubRole) {
              user = demoUsers.find(u => 
                u.email === credentials.email && 
                u.role === credentials.role && 
                u.adminSubRole === credentials.adminSubRole
              )
            }
            
            if (!user) {
              return null
            }

            // For demo users, validate password properly
            const isValidPassword = await bcrypt.compare(credentials.password, user.password)

            if (!isValidPassword) {
              return null
            }

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              adminSubRole: user.adminSubRole,
              avatar: user.avatar,
            }
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.adminSubRole = user.adminSubRole
        token.avatar = user.avatar
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as UserRole
        session.user.adminSubRole = token.adminSubRole as AdminSubRole
        session.user.avatar = token.avatar as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
}