import { db } from '../db.js'
import fs from 'fs'
import path from 'path'

export const studentImg = (req, res) => {
	const { email } = req.params // Get the user email from the request parameters
	console.log('email:', email)

	const q = 'SELECT * FROM students WHERE studentEmail = ?'
	db.query(q, [email], (err, results) => {
		if (err) return res.status(500).json(err)

		if (results.length === 0) {
			return res.status(404).json('Student not found')
		}

		const student = results[0]
		const newStudent = {
			studentPfp: req.file.filename || student.studentPfp,
		}

		const updatedFields = []
		const values = []

		// Check which fields have been updated
		if (newStudent.studentPfp !== student.studentPfp) {
			// Delete previous file if it exists
			if (student.studentPfp) {
				const filePath = path.join('public/student', student.studentPfp)
				fs.unlink(filePath, (err) => {
					if (err) {
						console.error('Error deleting file:', err)
					}
				})
			}

			updatedFields.push('studentPfp = ?')
			values.push(newStudent.studentPfp)
		}

		if (updatedFields.length === 0) {
			return res.status(400).json('No fields updated')
		}

		const q =
			'UPDATE students SET ' +
			updatedFields.join(', ') +
			' WHERE studentEmail = ?'

		db.query(q, [...values, email], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json('Student profile picture has been updated.')
		})
	})
}

export const teacherImg = (req, res) => {
	const { email } = req.params // Get the user email from the request parameters
	console.log('email:', email)

	const q = 'SELECT * FROM teachers WHERE teacherEmail = ?'
	db.query(q, [email], (err, results) => {
		if (err) return res.status(500).json(err)

		if (results.length === 0) {
			return res.status(404).json('Teacher not found')
		}

		const teacher = results[0]
		const newTeacher = {
			teacherPfp: req.file.filename || teacher.teacherPfp,
		}

		const updatedFields = []
		const values = []

		// Check which fields have been updated
		if (newTeacher.teacherPfp !== teacher.teacherPfp) {
			// Delete previous file if it exists
			if (teacher.teacherPfp) {
				const filePath = path.join('public/teacher', teacher.teacherPfp)
				fs.unlink(filePath, (err) => {
					if (err) {
						console.error('Error deleting file:', err)
					}
				})
			}

			updatedFields.push('teacherPfp = ?')
			values.push(newTeacher.teacherPfp)
		}

		if (updatedFields.length === 0) {
			return res.status(400).json('No fields updated')
		}

		const q =
			'UPDATE teachers SET ' +
			updatedFields.join(', ') +
			' WHERE teacherEmail = ?'

		db.query(q, [...values, email], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json('Teacher profile picture has been updated.')
		})
	})
}

export const parentImg = (req, res) => {
	const { email } = req.params // Get the user email from the request parameters
	console.log('email:', email)

	const q = 'SELECT * FROM parents WHERE parentEmail = ?'
	db.query(q, [email], (err, results) => {
		if (err) return res.status(500).json(err)

		if (results.length === 0) {
			return res.status(404).json('Parent not found')
		}

		const parent = results[0]
		const newParent = {
			parentPfp: req.file.filename || parent.parentPfp,
		}

		const updatedFields = []
		const values = []

		// Check which fields have been updated
		if (newParent.parentPfp !== parent.parentPfp) {
			// Delete previous file if it exists
			if (parent.parentPfp) {
				const filePath = path.join('public/parent', parent.parentPfp)
				fs.unlink(filePath, (err) => {
					if (err) {
						console.error('Error deleting file:', err)
					}
				})
			}

			updatedFields.push('parentPfp = ?')
			values.push(newParent.parentPfp)
		}

		if (updatedFields.length === 0) {
			return res.status(400).json('No fields updated')
		}

		const q =
			'UPDATE parents SET ' +
			updatedFields.join(', ') +
			' WHERE parentEmail = ?'

		db.query(q, [...values, email], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json('Parent profile picture has been updated.')
		})
	})
}
