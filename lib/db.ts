import { getMongoClientPromise } from './mongodb'

export async function connectToDatabase() {
  try {
    const client = await getMongoClientPromise()
    const db = client.db(process.env.DATABASE_NAME || 'collexus')
    
    return { client, db }
  } catch (error) {
    console.error('Failed to connect to database:', error)
    throw error
  }
}
