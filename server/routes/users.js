import express from 'express'
import {
	admin,
	adminEdit,
	getParent,
	getStudent,
	getTeacher,
	parentEdit,
	parents,
	studentEdit,
	students,
	teacherEdit,
	teachers,
} from '../controllers/user.js'

const router = express.Router()

router.get('/students', students)
router.get('/parents', parents)
router.get('/teachers', teachers)
router.get('/getStudent/:email', getStudent)
router.get('/getParent/:email', getParent)
router.get('/getTeacher/:email', getTeacher)
router.put('/student-edit/:email', studentEdit)
router.put('/parent-edit/:email', parentEdit)
router.put('/teacher-edit/:email', teacherEdit)

//admin side
router.get('/admin/:id', admin)
router.put('/admin-edit/:id', adminEdit)

export default router
