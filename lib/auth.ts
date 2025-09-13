import { getServerSession } from 'next-auth'
import { authOptions } from './auth-config'
import type { User } from './types'
export type { UserRole } from './types'

// Server-side function to get current user
export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return null
  }

  return {
    id: session.user.id,
    name: session.user.name || '',
    email: session.user.email || '',
    role: session.user.role,
    avatar: session.user.avatar,
  }
}
