import express from 'express'
import {
	getParent,
	getStudent,
	getTeacher,
	parentedit,
	parents,
	studentEdit,
	students,
	teacheredit,
	teachers,
} from '../controllers/user.js'

const router = express.Router()

router.get('/getStudent/:email', getStudent)
router.get('/getParent/:email', getParent)
router.get('/parents', parents)
router.get('/teachers', teachers)
router.put('/student-edit/:email', studentEdit)
router.put('/parent-edit/:userId', parentedit)
router.put('/teacher-edit/:userId', teacheredit)

export default router
