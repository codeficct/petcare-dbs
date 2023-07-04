import { Router } from 'express'
import * as userCtrl from '../controllers/user.controll'

const router = Router()

router.get('/auth', userCtrl.login)
router.get('/:id', userCtrl.getUser)

export default router
