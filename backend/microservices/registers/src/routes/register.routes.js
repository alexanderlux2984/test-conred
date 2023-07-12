import { Router } from 'express'
import { registerUser, ping } from '../controllers/register.controller.js'

const router = Router()

router.get('/user', registerUser);
router.get('/ping', ping)

export default router

