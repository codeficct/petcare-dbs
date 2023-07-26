import { Router } from 'express'
import * as petCtrl from '../controllers/pet.control.js'

const router = Router()

// ruta "/api/pet/" con el método"post" para crear una mascota
router.post('/', petCtrl.craetePet)
// buscar una mascota con su id
router.get('/:id', petCtrl.getPet)
// obtener todas las mascotas
router.get('/', petCtrl.getAllPets)
// Eliminar una mascota con su id
router.delete('/:id', petCtrl.deletePet)

export default router
