import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import { UserRole } from '../lib/models/User'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/collexus'
const DATABASE_NAME = process.env.DATABASE_NAME || 'collexus'

const demoUsers = [
  {
    id: crypto.randomUUID(),
    name: "John Doe",
    email: "student@college.edu",
    password: "password",
    role: "student" as UserRole,
    avatar: "/student-avatar.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Dr. Jane Smith",
    email: "faculty@college.edu",
    password: "password",
    role: "faculty" as UserRole,
    avatar: "/professor-avatar.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Admin User",
    email: "admin@college.edu",
    password: "password",
    role: "admin" as UserRole,
    avatar: "/admin-avatar.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Mary Johnson",
    email: "parent@college.edu",
    password: "password",
    role: "parent" as UserRole,
    avatar: "/parent-avatar.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db(DATABASE_NAME)
    const usersCollection = db.collection('users')
    
    // Clear existing users
    await usersCollection.deleteMany({})
    console.log('Cleared existing users')
    
    // Hash passwords and insert users
    const hashedUsers = await Promise.all(
      demoUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12),
      }))
    )
    
    const result = await usersCollection.insertMany(hashedUsers)
    console.log(`Inserted ${result.insertedCount} users`)
    
    // List the created users
    const createdUsers = await usersCollection.find({}).toArray()
    console.log('Created users:')
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.role}`)
    })
    
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await client.close()
    console.log('Database connection closed')
  }
}

// Run the seed function
seedDatabase()




