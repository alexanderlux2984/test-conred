import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT

// settings
app.set('port', PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '10mb' }))

// routes
app.use('/auth', authRoutes);

const main = () => {
  app.listen(PORT, () => console.log(`Running in PORT: ${PORT}`))
}

main();
