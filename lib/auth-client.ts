import type { User } from './types'

export function getCurrentUserClient(): User | null {
  if (typeof window === 'undefined') return null
  const userData = localStorage.getItem('currentUser')
  return userData ? JSON.parse(userData) : null
}

export const setCurrentUser = (user: User | null): void => {
  if (typeof window === 'undefined') return
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  } else {
    localStorage.removeItem('currentUser')
  }
}

export const logoutClient = (): void => {
  setCurrentUser(null)
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/signin'
  }
}






