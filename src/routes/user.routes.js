import { Router } from 'express'
import * as userCtrl from '../controllers/user.control.js'

const router = Router()

router.get('/:id', userCtrl.getUser) // find user by id
router.get('/', userCtrl.getUsers) // get all users
router.put('/:id', userCtrl.updateUser) // update fields of user
router.delete('/:id', userCtrl.deleteUser) // Delete user by id

export default router
