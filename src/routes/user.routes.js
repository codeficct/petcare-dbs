import { Router } from 'express'
import * as userCtrl from '../controllers/user.control.js'

const router = Router()

router.post('/auth', userCtrl.login) // auth login
router.get('/:id', userCtrl.getUser) // find user by id
router.get('/', userCtrl.getUsers) // get all users
router.put('/:id', userCtrl.updateUser) // update fields of user

export default router
