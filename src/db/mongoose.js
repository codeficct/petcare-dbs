import { connect, connection } from 'mongoose'

const conn = { isConnected: false }

// eslint-disable-next-line space-before-function-paren
export async function dbConnect() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  const db = await connect(process.env.MONGODB_URI, options)
  console.log('1. DATABASE NAME = ' + db.connection.db.databaseName)

  if (db.connections[0].readyState === 1) {
    return (conn.isConnected = true)
  }
}

connection.on('connected', () => console.log('Mongodb is connected to db'))

connection.on('error', (err) => {
  console.error('Mongodb error = ' + err.message)
  process.exit(1)
})
