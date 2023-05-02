import { db } from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//student register
export const register = (req, res) => {
	//CHECK EXISTING USER
	const q1 = 'SELECT * FROM students WHERE studentEmail = ?'
	const q2 = 'SELECT * FROM parents WHERE parentEmail = ?'
	const q3 = 'SELECT * FROM teachers WHERE teacherEmail = ?'

	db.query(q1, [req.body.email], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length)
			return res.status(409).json('The email is used by a student!')

		// If the email is not found in the 'students' table, check the 'parents' table
		db.query(q2, [req.body.email], (err, data) => {
			if (err) return res.status(500).json(err)
			if (data.length)
				return res.status(409).json('The email is used by a parent!')

			// If the email is not found in the 'parents' table, check the 'teachers' table
			db.query(q3, [req.body.email], (err, data) => {
				if (err) return res.status(500).json(err)
				if (data.length)
					return res.status(409).json('The email is used by a teacher!')

				//Hash the password and create a user
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(req.body.password, salt)

				const q =
					'INSERT INTO students(`studentName`,`studentEmail`,`studentNumber`, `studentBirth`, `studentAddr`, `studentSch`, `studentLevel`, `studentGrade`, `studentPass`) VALUES (?)'
				const values = [
					req.body.name,
					req.body.email,
					req.body.number,
					req.body.birthday,
					req.body.address,
					req.body.school,
					req.body.level,
					req.body.grade,
					hash,
				]

				db.query(q, [values], (err, data) => {
					if (err) return res.status(500).json(err)
					return res.status(200).json('User has been created.')
				})
			})
		})
	})
}

//parent register
export const parent = (req, res) => {
	//CHECK EXISTING USER
	const q1 = 'SELECT * FROM students WHERE studentEmail = ?'
	const q2 = 'SELECT * FROM parents WHERE parentEmail = ?'
	const q3 = 'SELECT * FROM teachers WHERE teacherEmail = ?'

	db.query(q1, [req.body.email], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length)
			return res.status(409).json('The email is used by a student!')

		// If the email is not found in the 'students' table, check the 'parents' table
		db.query(q2, [req.body.email], (err, data) => {
			if (err) return res.status(500).json(err)
			if (data.length)
				return res.status(409).json('The email is used by a parent!')

			// If the email is not found in the 'parents' table, check the 'teachers' table
			db.query(q3, [req.body.email], (err, data) => {
				if (err) return res.status(500).json(err)
				if (data.length)
					return res.status(409).json('The email is used by a teacher!')

				//Hash the password and create a user
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(req.body.password, salt)

				const q =
					'INSERT INTO parents (`parentName`, `parentEmail`, `parentNumber`, `parentJob`, `parentSalary`, `parentAddr`, `parentPfp`, `parentPass`) VALUES (?)'
				const values = [
					req.body.name,
					req.body.email,
					req.body.number,
					req.body.job,
					req.body.salary,
					req.body.address,
					req.body.pfp,
					hash,
				]

				db.query(q, [values], (err, data) => {
					if (err) return res.status(500).json(err)
					return res.status(200).json('User has been created.')
				})
			})
		})
	})
}

//teacher register
export const teacher = (req, res) => {
	//CHECK EXISTING USER
	const q1 = 'SELECT * FROM students WHERE studentEmail = ?'
	const q2 = 'SELECT * FROM parents WHERE parentEmail = ?'
	const q3 = 'SELECT * FROM teachers WHERE teacherEmail = ?'

	db.query(q1, [req.body.email], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length)
			return res.status(409).json('The email is used by a student!')

		// If the email is not found in the 'students' table, check the 'parents' table
		db.query(q2, [req.body.email], (err, data) => {
			if (err) return res.status(500).json(err)
			if (data.length)
				return res.status(409).json('The email is used by a parent!')

			// If the email is not found in the 'parents' table, check the 'teachers' table
			db.query(q3, [req.body.email], (err, data) => {
				if (err) return res.status(500).json(err)
				if (data.length)
					return res.status(409).json('The email is used by a teacher!')

				//Hash the password and create a user
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(req.body.password, salt)

				const q =
					'INSERT INTO teachers (`teacherName`, `teacherEmail`, `teacherNumber`, `teacherSch`, `teacherSalary`, `teacherAddr`, `teacherPfp`, `teacherPass`) VALUES (?)'
				const values = [
					req.body.name,
					req.body.email,
					req.body.number,
					req.body.school,
					req.body.salary,
					req.body.address,
					req.body.pfp,
					hash,
				]

				db.query(q, [values], (err, data) => {
					if (err) return res.status(500).json(err)
					return res.status(200).json('User has been created.')
				})
			})
		})
	})
}

//admin register
export const admins = (req, res) => {
	//CHECK EXISTING USER
	const q1 = 'SELECT * FROM students WHERE studentEmail = ?'
	const q2 = 'SELECT * FROM parents WHERE parentEmail = ?'
	const q3 = 'SELECT * FROM teachers WHERE teacherEmail = ?'
	const q4 = 'SELECT * FROM admins WHERE adminEmail = ?'

	db.query(q1, [req.body.email], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length)
			return res.status(409).json('The email is used by a student!')

		// If the email is not found in the 'students' table, check the 'parents' table
		db.query(q2, [req.body.email], (err, data) => {
			if (err) return res.status(500).json(err)
			if (data.length)
				return res.status(409).json('The email is used by a parent!')

			// If the email is not found in the 'parents' table, check the 'teachers' table
			db.query(q3, [req.body.email], (err, data) => {
				if (err) return res.status(500).json(err)
				if (data.length)
					return res.status(409).json('The email is used by a teacher!')

				// If the email is not found in the 'teachers' table, check the 'admins' table
				db.query(q3, [req.body.email], (err, data) => {
					if (err) return res.status(500).json(err)
					if (data.length)
						return res.status(409).json('The email is used by an admin!')

					//Hash the password and create a user
					const salt = bcrypt.genSaltSync(10)
					const hash = bcrypt.hashSync(req.body.password, salt)

					const q =
						'INSERT INTO admins (`adminName`, `adminEmail`, `staffId`, `adminPass`) VALUES (?)'
					const values = [req.body.name, req.body.email, req.body.staff, hash]

					db.query(q, [values], (err, data) => {
						if (err) return res.status(500).json(err)
						return res.status(200).json('User has been created.')
					})
				})
			})
		})
	})
}

// student, parent and teacher login
export const login = (req, res) => {
	//CHECK USER
	const q1 = 'SELECT * FROM students WHERE studentEmail = ?'
	const q2 = 'SELECT * FROM parents WHERE parentEmail = ?'
	const q3 = 'SELECT * FROM teachers WHERE teacherEmail = ?'

	// Try to find the user in the 'students' table
	db.query(q1, [req.body.email], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length > 0) {
			// User found in 'students' table
			const isPasswordCorrect = bcrypt.compareSync(
				req.body.password,
				data[0].studentPass
			)
			if (!isPasswordCorrect) {
				return res.status(400).json('Wrong email or password!')
			}
			const token = jwt.sign({ id: data[0].id, type: 'student' }, 'jwtkey')
			const { studentPass, ...other } = data[0]
			return res
				.cookie('access_token', token, {
					httpOnly: true,
				})
				.status(200)
				.json(other)
		} else {
			// Try to find the user in the 'parents' table
			db.query(q2, [req.body.email], (err, data) => {
				if (err) return res.status(500).json(err)
				if (data.length > 0) {
					// User found in 'parents' table
					const isPasswordCorrect = bcrypt.compareSync(
						req.body.password,
						data[0].parentPass
					)
					if (!isPasswordCorrect) {
						return res.status(400).json('Wrong email or password!')
					}
					const token = jwt.sign({ id: data[0].id, type: 'parent' }, 'jwtkey')
					const { parentPass, ...other } = data[0]
					return res
						.cookie('access_token', token, {
							httpOnly: true,
						})
						.status(200)
						.json(other)
				} else {
					// Try to find the user in the 'teachers' table
					db.query(q3, [req.body.email], (err, data) => {
						if (err) return res.status(500).json(err)
						if (data.length > 0) {
							// User found in 'teachers' table
							const isPasswordCorrect = bcrypt.compareSync(
								req.body.password,
								data[0].teacherPass
							)
							if (!isPasswordCorrect) {
								return res.status(400).json('Wrong email or password!')
							}
							const token = jwt.sign(
								{ id: data[0].id, type: 'teacher' },
								'jwtkey'
							)
							const { teacherPass, ...other } = data[0]
							return res
								.cookie('access_token', token, {
									httpOnly: true,
								})
								.status(200)
								.json(other)
						} else {
							return res.status(404).json('User not found!')
						}
					})
				}
			})
		}
	})
}

//admin login
export const adminlogin = (req, res) => {
	//CHECK USER
	const q = 'SELECT * FROM admins WHERE adminEmail = ?'

	db.query(q, [req.body.email], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length > 0) {
			try {
				const isPasswordCorrect = bcrypt.compareSync(
					req.body.password,
					data[0].adminPass
				)
				if (!isPasswordCorrect) {
					return res.status(400).json('Wrong email or password!')
				}
				const token = jwt.sign({ id: data[0].id, type: 'admin' }, 'jwtkey')
				const { adminPass, ...other } = data[0]
				return res
					.cookie('access_token', token, {
						httpOnly: true,
					})
					.status(200)
					.json(other)
			} catch (error) {
				return res.status(500).json('Error: ' + error)
			}
		} else {
			return res.status(404).json('User not found!')
		}
	})
}

//reset password
export const reset = (req, res) => {
	const { email } = req.params // Get the user email from the request parameters
	console.log('email:', email)

	// Check if the user exists in the students table
	const q1 = 'SELECT * FROM students WHERE studentEmail = ?'
	db.query(q1, [email], (err, data) => {
		if (err) {
			return res.status(500).json(err)
		}
		if (data.length) {
			// If the user is found in the students table, update their password
			const salt = bcrypt.genSaltSync(10)
			const hash = bcrypt.hashSync(req.body.password, salt)
			const q = 'UPDATE students SET studentPass = ? WHERE studentEmail = ?'
			db.query(q, [hash, email], (err, data) => {
				if (err) {
					return res.status(500).json(err)
				}
				return res.status(200).json('Student password updated.')
			})
			return
		}

		// If the user is not found in the students table, check the parents table
		const q2 = 'SELECT * FROM parents WHERE parentEmail = ?'
		db.query(q2, [email], (err, data) => {
			if (err) {
				return res.status(500).json(err)
			}
			if (data.length) {
				// If the user is found in the parents table, update their password
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(req.body.password, salt)
				const q = 'UPDATE parents SET parentPass = ? WHERE parentEmail = ?'
				db.query(q, [hash, email], (err, data) => {
					if (err) {
						return res.status(500).json(err)
					}
					return res.status(200).json('Parent password updated.')
				})
				return
			}

			// If the user is not found in the parents table, check the teachers table
			const q3 = 'SELECT * FROM teachers WHERE teacherEmail = ?'
			db.query(q3, [email], (err, data) => {
				if (err) {
					return res.status(500).json(err)
				}
				if (data.length) {
					// If the user is found in the teachers table, update their password
					const salt = bcrypt.genSaltSync(10)
					const hash = bcrypt.hashSync(req.body.password, salt)
					const q = 'UPDATE teachers SET teacherPass = ? WHERE teacherEmail = ?'
					db.query(q, [hash, email], (err, data) => {
						if (err) {
							return res.status(500).json(err)
						}
						return res.status(200).json('Teacher password updated.')
					})
					return
				}

				// If the user is not found in the teachers table, check the admins table
				const q4 = 'SELECT * FROM admins WHERE adminEmail = ?'
				db.query(q4, [email], (err, data) => {
					if (err) {
						return res.status(500).json(err)
					}
					if (data.length) {
						// If the user is found in the admins table, update their password
						const salt = bcrypt.genSaltSync(10)
						const hash = bcrypt.hashSync(req.body.password, salt)
						const q = 'UPDATE admins SET adminPass = ? WHERE adminEmail = ?'
						db.query(q, [hash, email], (err, data) => {
							if (err) {
								return res.status(500).json(err)
							}
							return res.status(200).json('Admin password updated.')
						})
						return
					} // If the user is not found in any table, return an error message
					return res.status(404).json('User not found.')
				})
			})
		})
	})
}

//logout
export const logout = (req, res) => {
	res
		.clearCookie('access_token', {
			sameSite: 'none',
			secure: true,
		})
		.status(200)
		.json('User has been logged out.')
}
