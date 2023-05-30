import express from 'express'
import { parentImg, studentImg, teacherImg } from '../controllers/upload.js'
import multer from 'multer'
import path from 'path'

const maxSize = 700 * 1024 // 700kB

const studentStore = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/student')
	},
	filename: (req, file, cb) => {
		cb(null, 'student_' + Date.now() + path.extname(file.originalname))
	},
})

const studentUp = multer({
	storage: studentStore,
	limits: { fileSize: maxSize }, // Set the file size limit
})

const teacherStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/teacher')
	},
	filename: (req, file, cb) => {
		cb(null, 'teacher_' + Date.now() + path.extname(file.originalname))
	},
})

const teacherUpload = multer({
	storage: teacherStorage,
	limits: { fileSize: maxSize }, // Set the file size limit
})

const parentStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/parent')
	},
	filename: (req, file, cb) => {
		cb(null, 'parent_' + Date.now() + path.extname(file.originalname))
	},
})

const parentUpload = multer({
	storage: parentStorage,
	limits: { fileSize: maxSize }, // Set the file size limit
})

const router = express.Router()

router.post('/studentImg/:email', studentUp.single('image'), studentImg)
router.post('/teacherImg/:email', teacherUpload.single('image'), teacherImg)
router.post('/parentImg/:email', parentUpload.single('image'), parentImg)

export default router
