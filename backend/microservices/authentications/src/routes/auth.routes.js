import { Router } from 'express'
import { login, ping } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', login)
router.get('/ping', ping)

export default router

