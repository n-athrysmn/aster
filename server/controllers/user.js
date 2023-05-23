import { db } from '../db.js'

//get students list
export const students = (req, res) => {
	const q =
		'SELECT studentId, studentName, studentEmail, studentNumber, studentPar, studentParNum FROM students'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get parents list
export const parents = (req, res) => {
	const q =
		'SELECT parentId, parentName, parentEmail, parentNumber FROM parents'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get teachers list
export const teachers = (req, res) => {
	const q =
		'SELECT teacherId, teacherName, teacherEmail, teacherNumber FROM teachers'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get student data
export const getStudent = (req, res) => {
	const { email } = req.params // Get the user email from the request parameters
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
		return res.status(200).json(data[0])
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
		return res.status(200).json(data[0])
	})
}

// edit students
export const studentEdit = (req, res) => {
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
			studentName: req.body.studentName || student.studentName,
			studentEmail: req.body.studentEmail || student.studentEmail,
			studentNumber: req.body.studentNumber || student.studentNumber,
			studentAddr: req.body.studentAddr || student.studentAddr,
			studentSch: req.body.studentSch || student.studentSch,
			studentLevel: req.body.studentLevel || student.studentLevel,
			studentGrade: req.body.studentGrade || student.studentGrade,
			studentPar: req.body.studentPar || student.studentPar,
			studentParNum: req.body.studentParNum || student.studentParNum,
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
		if (newStudent.studentPar !== student.studentPar) {
			updatedFields.push('studentPar = ?')
			values.push(newStudent.studentPar)
		}
		if (newStudent.studentParNum !== student.studentParNum) {
			updatedFields.push('studentParNum = ?')
			values.push(newStudent.studentParNum)
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

//edit parent profile
export const parentEdit = (req, res) => {
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
			parentName: req.body.parentName || parent.parentName,
			parentEmail: req.body.parentEmail || parent.parentEmail,
			parentNumber: req.body.parentNumber || parent.parentNumber,
			parentAddr: req.body.parentAddr || parent.parentAddr,
			parentJob: req.body.parentJob || parent.parentJob,
			parentSalary: req.body.parentSalary || parent.parentSalary,
		}

		const updatedFields = []
		const values = []

		// Check which fields have been updated
		if (newParent.parentName !== parent.parentName) {
			updatedFields.push('parentName = ?')
			values.push(newParent.parentName)
		}
		if (newParent.parentEmail !== parent.parentEmail) {
			updatedFields.push('parentEmail = ?')
			values.push(newParent.parentEmail)
		}
		if (newParent.parentNumber !== parent.parentNumber) {
			updatedFields.push('parentNumber = ?')
			values.push(newParent.parentNumber)
		}
		if (newParent.parentAddr !== parent.parentAddr) {
			updatedFields.push('parentAddr = ?')
			values.push(newParent.parentAddr)
		}
		if (newParent.parentJob !== parent.parentJob) {
			updatedFields.push('parentJob = ?')
			values.push(newParent.parentJob)
		}
		if (newParent.parentSalary !== parent.parentSalary) {
			updatedFields.push('parentSalary = ?')
			values.push(newParent.parentSalary)
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
			return res.status(200).json('Parent data has been updated.')
		})
	})
}

//edit teacher profile
export const teacherEdit = (req, res) => {
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
			teacherName: req.body.teacherName || teacher.teacherName,
			teacherEmail: req.body.teacherEmail || teacher.teacherEmail,
			teacherNumber: req.body.teacherNumber || teacher.teacherNumber,
			teacherSch: req.body.teacherSch || teacher.teacherSch,
			teacherSalary: req.body.teacherSalary || teacher.teacherSalary,
			teacherAddr: req.body.teacherAddr || teacher.teacherAddr,
		}

		const updatedFields = []
		const values = []

		// Check which fields have been updated
		if (newTeacher.teacherName !== teacher.teacherName) {
			updatedFields.push('teacherName = ?')
			values.push(newTeacher.teacherName)
		}
		if (newTeacher.teacherEmail !== teacher.teacherEmail) {
			updatedFields.push('teacherEmail = ?')
			values.push(newTeacher.teacherEmail)
		}
		if (newTeacher.teacherNumber !== teacher.teacherNumber) {
			updatedFields.push('teacherNumber = ?')
			values.push(newTeacher.teacherNumber)
		}
		if (newTeacher.teacherSch !== teacher.teacherSch) {
			updatedFields.push('teacherSch = ?')
			values.push(newTeacher.teacherSch)
		}
		if (newTeacher.teacherSalary !== teacher.teacherSalary) {
			updatedFields.push('teacherSalary = ?')
			values.push(newTeacher.teacherSalary)
		}
		if (newTeacher.teacherAddr !== teacher.teacherAddr) {
			updatedFields.push('teacherAddr = ?')
			values.push(newTeacher.teacherAddr)
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
			return res.status(200).json('Teacher data has been updated.')
		})
	})
}

//admin data
export const admin = (req, res) => {
	const { id } = req.params // Get the user id from the request parameters
	console.log('id:', id)

	const q = 'SELECT * FROM admins WHERE id = ? LIMIT 1'
	const values = [id]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data[0])
	})
}

//edit admin profile
export const adminEdit = (req, res) => {
	const { id } = req.params // Get the user id from the request parameters
	console.log('id:', id)

	const q = 'SELECT * FROM admins WHERE id = ?'
	db.query(q, [id], (err, results) => {
		if (err) return res.status(500).json(err)

		if (results.length === 0) {
			return res.status(404).json('Admin not found')
		}

		const admin = results[0]
		const newAdmin = {
			adminName: req.body.adminName || admin.adminName,
			adminEmail: req.body.adminEmail || admin.adminEmail,
			staffId: req.body.staffId || admin.staffId,
		}

		const updatedFields = []
		const values = []

		// Check which fields have been updated
		if (newAdmin.adminName !== admin.adminName) {
			updatedFields.push('adminName = ?')
			values.push(newAdmin.adminName)
		}
		if (newAdmin.adminEmail !== admin.adminEmail) {
			updatedFields.push('adminEmail = ?')
			values.push(newAdmin.adminEmail)
		}
		if (newAdmin.staffId !== admin.staffId) {
			updatedFields.push('staffId = ?')
			values.push(newAdmin.staffId)
		}

		if (updatedFields.length === 0) {
			return res.status(400).json('No fields updated')
		}

		const q = 'UPDATE admins SET ' + updatedFields.join(', ') + ' WHERE id = ?'

		db.query(q, [...values, id], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json('Admin data has been updated.')
		})
	})
}

//user data
export const user = (req, res) => {
	const { email } = req.params // Get the user id from the request parameters
	console.log('email:', email)

	const studentQuery = `SELECT * FROM students WHERE studentEmail = ? LIMIT 1`
	const teacherQuery = `SELECT * FROM teachers WHERE teacherEmail = ? LIMIT 1`
	const parentQuery = `SELECT * FROM parents WHERE parentEmail = ? LIMIT 1`

	const values = [email]

	// Execute queries for each table separately
	db.query(studentQuery, values, (studentErr, studentData) => {
		if (studentErr) return res.status(500).json(studentErr)

		db.query(teacherQuery, values, (teacherErr, teacherData) => {
			if (teacherErr) return res.status(500).json(teacherErr)

			db.query(parentQuery, values, (parentErr, parentData) => {
				if (parentErr) return res.status(500).json(parentErr)

				const userData = {
					student: studentData[0],
					teacher: teacherData[0],
					parent: parentData[0],
				}

				return res.status(200).json(userData)
			})
		})
	})
}
