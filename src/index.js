import app from './app.js'
import dotenv from 'dotenv'
import './database.js'
dotenv.config() // load enviroment variables from .env file

const PORT = process.env.NODE_ENV === 'development' ? 3000 : process.env.PORT
// server running
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
