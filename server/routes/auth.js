import express from 'express'
import {
	register,
	parent,
	login,
	logout,
	teacher,
	admins,
	adminlogin,
	reset,
	emailChange,
} from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/parent-register', parent)
router.post('/teacher-register', teacher)
router.post('/admin-register', admins)
router.post('/admin-login', adminlogin)
router.post('/login', login)
router.put('/reset/:email', reset)
router.put('/email/:email', emailChange)
router.post('/logout', logout)

export default router
