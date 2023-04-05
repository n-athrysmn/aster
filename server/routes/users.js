import express from 'express'
import { parents, students, teachers, userEdit } from '../controllers/user.js'

const router = express.Router()

router.get('/students', students)
router.get('/parents', parents)
router.get('/teachers', teachers)
router.put('/:userId', userEdit)

export default router
