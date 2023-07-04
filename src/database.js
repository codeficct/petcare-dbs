import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const connectionString = process.env.MONGO_URI != null ? process.env.MONGO_URI : ''

if (connectionString === '') {
  throw new Error(
    'Please define the MONGO_URI enviroment variable in .env'
  )
}

const conn = {
  isConnected: false
}

export async function dbConnet () {
  const database = connectionString
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  // check if we have connection to the database
  if (conn.isConnected) return
  const db = await mongoose.connect(database, options)
  if (db.connections[0].readyState === 1) return (conn.isConnected = true)
}
// if we are connected to the database
mongoose.connection.once('open', () => {
  console.log('Database MongoDB connection stablished')
})
// if we have an error connecting to the database
mongoose.connection.on('error', (error) => {
  console.error('MongoDb connected to "Error"', error.message)
  process.exit(1)
})

dbConnet().catch(console.error)
