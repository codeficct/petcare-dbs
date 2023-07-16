import { Router } from 'express'
import * as vaccineCtrl from '../controllers/vaccine.control.js'

const router = Router()

router.get('/', vaccineCtrl.getAllVaccines)
router.post('/', vaccineCtrl.createVaccine)
router.get('/:id', vaccineCtrl.getVaccine)
router.put('/:id', vaccineCtrl.updateVaccine)
router.delete('/:id', vaccineCtrl.deleteVaccine)

export default router
