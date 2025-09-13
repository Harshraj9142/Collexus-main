import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { UserModel } from '@/lib/models/User'

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const userModel = new UserModel(db)
    
    // Get count of users with role 'student'
    const studentCount = await db.collection('users').countDocuments({ role: 'student' })
    
    return NextResponse.json({ 
      success: true, 
      count: studentCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching student count:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch student count' },
      { status: 500 }
    )
  }
}
