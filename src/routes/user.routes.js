import { Router } from 'express'
import * as userCtrl from '../controllers/user.control.js'

const router = Router()

router.post('/auth', userCtrl.login)
router.get('/:id', userCtrl.getUser)
router.get('/', userCtrl.getUsers)

export default router
