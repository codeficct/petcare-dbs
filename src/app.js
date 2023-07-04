import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes'
const app = express()
// cors: Cross-Origin Resource Sharing
// it is a mechanism to allow or restrict requested resources on a web server depend on where the HTTP request was initiated.
app.use(cors({ origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }))

app.use(express.json())

app.get('/api/user', userRoutes)

export default app
