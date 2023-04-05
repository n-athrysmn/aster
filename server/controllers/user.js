import { db } from '../db.js'

//edit users
export const userEdit = (req, res) => {
	const studentId = req.params.id // or req.body.id, depending on how you pass the ID

	const q =
		'UPDATE students SET studentName = ?, studentEmail = ?, studentNumber = ?, studentBirth = ?, studentAddr = ?, studentSch = ?, studentLevel = ?, studentGrade = ?, studentPfp = ? WHERE id = ?'

	const values = [
		req.body.name,
		req.body.email,
		req.body.number,
		req.body.birthday,
		req.body.address,
		req.body.school,
		req.body.level,
		req.body.grade,
		req.body.pfp,
		studentId,
	]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json('Student data has been updated.')
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

export const teacheredit = (req, res) => {
	const teacherId = req.params.id // or req.body.id, depending on how you pass the ID

	const q =
		'UPDATE teachers SET teacherName = ?, teacherEmail = ?, teacherNumber = ?, teacherSch = ?, teacherSalary = ?, teacherAddr = ?, teacherPfp = ? WHERE id = ?'

	const values = [
		req.body.name,
		req.body.email,
		req.body.number,
		req.body.school,
		req.body.salary,
		req.body.address,
		req.body.pfp,
		teacherId,
	]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json('Teacher data has been updated.')
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
