import { Db } from 'mongodb'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'

export type UserRole = "student" | "faculty" | "admin" | "parent"
export type AdminSubRole = "financial" | "academic" | "hostel" | "library"
export type FacultySubRole = "hod" | "assistant_hod" | "professor"

export interface User {
  _id?: string
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  adminSubRole?: AdminSubRole
  FacultySubRole?: FacultySubRole
  avatar?: string
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}

export interface UserInput {
  name: string
  email: string
  password: string
  role: UserRole
  adminSubRole?: AdminSubRole
  FacultySubRole?: FacultySubRole
  avatar?: string
}

export class UserModel {
  private db: Db

  constructor(db: Db) {
    this.db = db
  }

  async createUser(userData: UserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    
    const user: Omit<User, '_id'> = {
      id: randomUUID(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
      adminSubRole: userData.adminSubRole,
      FacultySubRole: userData.FacultySubRole,
      avatar: userData.avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await this.db.collection('users').insertOne(user)
    
    return {
      ...user,
      _id: result.insertedId.toString(),
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.db.collection('users').findOne({ email })
    if (!user) return null
    return {
      _id: user._id?.toString(),
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      adminSubRole: user.adminSubRole,
      FacultySubRole: user.FacultySubRole,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    } as User
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.db.collection('users').findOne({ id })
    if (!user) return null
    return {
      _id: user._id?.toString(),
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      adminSubRole: user.adminSubRole,
      FacultySubRole: user.FacultySubRole,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    } as User
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password)
  }

  async updateUser(id: string, updates: Partial<UserInput>): Promise<User | null> {
    const updateData: Record<string, unknown> = {
      ...updates,
      updatedAt: new Date(),
    }

    if (updates.password) {
      updateData.password = await bcrypt.hash(updates.password, 12)
    }

    const result = await this.db.collection('users').findOneAndUpdate(
      { id },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    if (!result) return null
    return result as unknown as User
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.db.collection('users').deleteOne({ id })
    return result.deletedCount > 0
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.db.collection('users').find({}).toArray()
    return users as unknown as User[]
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    const users = await this.db.collection('users').find({ role }).toArray()
    return users as unknown as User[]
  }
}
