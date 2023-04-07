import { db } from '../db.js'

//get student data
export const getStudent = (req, res) => {
	const { email } = req.params // Get the user id from the request parameters
	console.log('email:', email)

	const q = 'SELECT * FROM students WHERE studentEmail = ? LIMIT 1'
	const values = [email]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data[0])
	})
}

//get parent data
export const getParent = (req, res) => {
	const { email } = req.params // Get the user email from the request parameters
	console.log('email:', email)

	const q = 'SELECT * FROM parents WHERE parentEmail = ? LIMIT 1'
	const values = [email]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get teacher data
export const getTeacher = (req, res) => {
	const { email } = req.params // Get the user email from the request parameters
	console.log('email:', email)

	const q = 'SELECT * FROM teachers WHERE teacherEmail = ? LIMIT 1'
	const values = [email]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

// edit students
export const studentEdit = (req, res) => {
	const { email } = req.params // Get the user id from the request parameters
	console.log('email:', email)

	const q = 'SELECT * FROM students WHERE studentEmail = ?'
	db.query(q, [email], (err, results) => {
		if (err) return res.status(500).json(err)

		if (results.length === 0) {
			return res.status(404).json('Student not found')
		}

		const student = results[0]
		const newStudent = {
			studentName: req.body.studentName || student.studentName,
			studentEmail: req.body.studentEmail || student.studentEmail,
			studentNumber: req.body.studentNumber || student.studentNumber,
			studentBirth: req.body.formattedDate || student.studentBirth,
			studentAddr: req.body.studentAddr || student.studentAddr,
			studentSch: req.body.studentSch || student.studentSch,
			studentLevel: req.body.studentLevel || student.studentLevel,
			studentGrade: req.body.studentGrade || student.studentGrade,
		}

		const updatedFields = []
		const values = []

		// Check which fields have been updated
		if (newStudent.studentName !== student.studentName) {
			updatedFields.push('studentName = ?')
			values.push(newStudent.studentName)
		}
		if (newStudent.studentEmail !== student.studentEmail) {
			updatedFields.push('studentEmail = ?')
			values.push(newStudent.studentEmail)
		}
		if (newStudent.studentNumber !== student.studentNumber) {
			updatedFields.push('studentNumber = ?')
			values.push(newStudent.studentNumber)
		}
		if (newStudent.studentBirth !== student.studentBirth) {
			updatedFields.push('studentBirth = ?')
			values.push(newStudent.studentBirth)
		}
		if (newStudent.studentAddr !== student.studentAddr) {
			updatedFields.push('studentAddr = ?')
			values.push(newStudent.studentAddr)
		}
		if (newStudent.studentSch !== student.studentSch) {
			updatedFields.push('studentSch = ?')
			values.push(newStudent.studentSch)
		}
		if (newStudent.studentLevel !== student.studentLevel) {
			updatedFields.push('studentLevel = ?')
			values.push(newStudent.studentLevel)
		}
		if (newStudent.studentGrade !== student.studentGrade) {
			updatedFields.push('studentGrade = ?')
			values.push(newStudent.studentGrade)
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
			return res.status(200).json('Student data has been updated.')
		})
	})
}

export const parentedit = (req, res) => {
	const parentId = req.params.id // or req.body.id, depending on how you pass the ID

	const q =
		'UPDATE parents SET parentName = ?, parentEmail = ?, parentNumber = ?, parentAddr = ?, parentSalary = ?, parentJob = ?, parentPfp = ? WHERE id = ?'

	const values = [
		req.body.name,
		req.body.email,
		req.body.number,
		req.body.address,
		req.body.salary,
		req.body.job,
		req.body.pfp,
		parentId,
	]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json('Parent data has been updated.')
	})
}

//edit teacher profile
export const teacheredit = (req, res) => {
	const { userId } = req.params // Get the user id from the request parameters
	console.log('userId:', userId)

	// Retrieve current data of the teacher from the database
	const selectQuery = 'SELECT * FROM teachers WHERE teacherId = ?'
	db.query(selectQuery, [userId], (err, result) => {
		if (err) return res.status(500).json(err)

		const currentData = result[0]
		console.log('currentData:', currentData)

		// Compare current data with new data submitted in the request body
		const newData = {
			teacherName: req.body.name || currentData.teacherName,
			teacherEmail: req.body.email || currentData.teacherEmail,
			teacherNumber: req.body.number || currentData.teacherNumber,
			teacherSch: req.body.school || currentData.teacherSch,
			teacherSalary: req.body.salary || currentData.teacherSalary,
			teacherAddr: req.body.address || currentData.teacherAddr,
			teacherPfp: req.body.pfp || currentData.teacherPfp,
		}
		console.log('newData:', newData)

		// Update only the fields that have changed in the database
		const updateQuery =
			'UPDATE teachers SET `teacherName` = ?, `teacherEmail` = ?, `teacherNumber` = ?, `teacherSch` = ?, `teacherSalary` = ?, `teacherAddr` = ?, `teacherPfp` = ? WHERE teacherId = ?'
		const values = [
			newData.teacherName,
			newData.teacherEmail,
			newData.teacherNumber,
			newData.teacherSch,
			newData.teacherSalary,
			newData.teacherAddr,
			newData.teacherPfp,
			userId,
		]

		db.query(updateQuery, values, (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json('Teacher data has been updated.')
		})
	})
}

export const students = (req, res) => {
	const q =
		'SELECT studentId, studentName, studentEmail, studentNumber FROM students'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

export const parents = (req, res) => {
	const q =
		'SELECT parentId, parentName, parentEmail, parentNumber FROM parents'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

export const teachers = (req, res) => {
	const q =
		'SELECT teacherId, teacherName, teacherEmail, teacherNumber FROM teachers'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}
