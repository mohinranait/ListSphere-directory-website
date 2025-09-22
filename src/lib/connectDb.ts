



import mongoose from "mongoose"
import { DB_URL } from "./access-env";

const MONGODB_URI = DB_URL || '';

if (!MONGODB_URI) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env")
}

interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

declare const global: GlobalWithMongoose

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDb() {
  console.log("Conne");
  
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDb
