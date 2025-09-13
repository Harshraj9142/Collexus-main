import { MongoClient } from 'mongodb'

const options = {}

let client: MongoClient | undefined
let clientPromise: Promise<MongoClient> | undefined

export function getMongoClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local')
  }

  if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    return globalWithMongo._mongoClientPromise!
  }

  if (!clientPromise) {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
  return clientPromise
}

