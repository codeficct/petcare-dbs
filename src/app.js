import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import petRoutes from './routes/pet.routes.js'
import authRoutes from './routes/auth.routes.js'
import vaccineRoutes from './routes/vaccine.routes.js'

const app = express()

// cors: Cross-Origin Resource Sharing
// it is a mechanism to allow or restrict requested resources on a web server depend on where the HTTP request was initiated.
app.use(cors({ origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/pet', petRoutes)
app.use('/api/vaccine', vaccineRoutes)

export default app
