import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import userRoutes from './routes/user.routes'

dotenv.config();
const app = express();

const PORT = 3001

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '10mb' }))


// settings
app.set('port', PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '10mb' }))

// routes
app.use('/user', userRoutes)

const main = () => {
  app.listen(PORT, () => console.log(`Running in: http://localhost:${PORT}`))
}

main();
