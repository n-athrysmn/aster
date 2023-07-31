import { db } from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//student register
export const register = (req, res) => {
	//CHECK EXISTING USER
	const q1 = 'SELECT * FROM students WHERE studentEmail = ?'
	const q2 = 'SELECT * FROM parents WHERE parentEmail = ?'
	const q3 = 'SELECT * FROM teachers WHERE teacherEmail = ?'
	const q4 = 'SELECT * FROM admins WHERE adminEmail = ?'

	db.query(q1, [req.body.email], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length)
			return res.status(409).json('The email is used by another student!')

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

				//if email is not found in the 'teachers' table, check 'admins' table
				db.query(q4, [req.body.email], (err, data) => {
					if (err) return res.status(500).json(err)
					if (data.length) return res.status(409).json('Cannot use this email!')

					// Check if the number exists
					const q5 = 'SELECT * FROM students WHERE studentNumber = ?'

					db.query(q5, [req.body.number], (err, data) => {
						if (err) return res.status(500).json(err)
						if (data.length)
							return res
								.status(409)
								.json('User with the same phone number exists!')

						//Hash the password and create a user
						const salt = bcrypt.genSaltSync(10)
						const hash = bcrypt.hashSync(req.body.password, salt)

						const q =
							'INSERT INTO students(`studentName`,`studentEmail`,`studentNumber`, `studentBirth`, `studentAddr`, `studentSch`, `studentLevel`, `studentGrade`, `studentPass`, `studentPar`, `studentParNum`) VALUES (?)'
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
							req.body.parName,
							req.body.parNum,
						]

						db.query(q, [values], (err, data) => {
							if (err) return res.status(500).json(err)
							return res.status(200).json('User has been created.')
						})
					})
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

				//if email is not found in the 'teachers' table, check 'admins' table
				db.query(q4, [req.body.email], (err, data) => {
					if (err) return res.status(500).json(err)
					if (data.length) return res.status(409).json('Cannot use this email!')

					// Check if the number exists
					const q5 = 'SELECT * FROM parents WHERE parentNumber = ?'

					db.query(q5, [req.body.number], (err, data) => {
						if (err) return res.status(500).json(err)
						if (data.length)
							return res
								.status(409)
								.json('User with the same phone number exists!')

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
		})
	})
}

//teacher register
export const teacher = (req, res) => {
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

				//if email is not found in the 'teachers' table, check 'admins' table
				db.query(q4, [req.body.email], (err, data) => {
					if (err) return res.status(500).json(err)
					if (data.length) return res.status(409).json('Cannot use this email!')

					// Check if the number exists
					const q5 = 'SELECT * FROM teachers WHERE teacherNumber = ?'

					db.query(q5, [req.body.number], (err, data) => {
						if (err) return res.status(500).json(err)
						if (data.length)
							return res
								.status(409)
								.json('User with the same phone number exists!')

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
	const q5 = 'SELECT * FROM admins WHERE staffId = ?'

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

				db.query(q4, [req.body.email], (err, data) => {
					if (err) return res.status(500).json(err)
					if (data.length) {
						return res.status(409).json('The email is used by another admin!')
					}

					// If the email is not found in the 'admins' table, check the 'admins' table for the staffId
					db.query(q5, [req.body.staff], (err, data) => {
						if (err) return res.status(500).json(err)
						if (data.length) {
							return res.status(409).json('Staff ID is registered!')
						}

						//Hash the password and create a user
						const salt = bcrypt.genSaltSync(10)
						const hash = bcrypt.hashSync(req.body.password, salt)

						const q =
							'INSERT INTO admins (`adminName`, `adminEmail`, `staffId`, `adminPass`, `status`, `type`) VALUES (?)'
						const values = [
							req.body.name,
							req.body.email,
							req.body.staff,
							hash,
							0,
							'Admin',
						]

						db.query(q, [values], (err, data) => {
							if (err) return res.status(500).json(err)
							return res.status(200).json('User has been created.')
						})
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
				return res.status(400).json('Wrong password!')
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
						return res.status(400).json('Wrong password!')
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
								return res.status(400).json('Wrong password!')
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
	// CHECK USER
	const q = 'SELECT * FROM admins WHERE adminEmail = ?'

	db.query(q, [req.body.email], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length > 0) {
			if (data[0].status !== 1) {
				return res
					.status(401)
					.json(
						'Unauthorized User! Please contact the management if you think this is a mistake.'
					)
			}

			try {
				const isPasswordCorrect = bcrypt.compareSync(
					req.body.password,
					data[0].adminPass
				)
				if (!isPasswordCorrect) {
					return res.status(400).json('Wrong password!')
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

//reset password
export const forgot = (req, res) => {
	const { number } = req.params // Get the user number from the request parameters
	const email = req.body.email

	// Check if the user exists in the students table
	const q1 = 'SELECT * FROM students WHERE studentNumber = ?'
	db.query(q1, [number], (err, data) => {
		if (err) {
			return res.status(500).json(err)
		}
		if (data.length) {
			// If the user is found in the students table
			const student = data[0]
			if (student.studentEmail === email) {
				// If the entered email is the same as the old email
				return res
					.status(400)
					.json(
						'You entered your old email. Login to your account using the email, or you can reset your password if you forgot it.'
					)
			}

			// Update the student's email
			const q = 'UPDATE students SET studentEmail = ? WHERE studentNumber = ?'
			db.query(q, [email, number], (err, data) => {
				if (err) {
					return res.status(500).json(err)
				}
				return res.status(200).json('Student email updated.')
			})
			return
		}

		// If the user is not found in the students table, check the parents table
		const q2 = 'SELECT * FROM parents WHERE parentNumber = ?'
		db.query(q2, [number], (err, data) => {
			if (err) {
				return res.status(500).json(err)
			}
			if (data.length) {
				// If the user is found in the parents table
				const parent = data[0]
				if (parent.parentEmail === email) {
					// If the entered email is the same as the old email
					return res
						.status(400)
						.json(
							'You entered your old email. Login to your account using the email, or you can reset your password if you forgot it.'
						)
				}

				// Update the parent's email
				const q = 'UPDATE parents SET parentEmail = ? WHERE parentNumber = ?'
				db.query(q, [email, number], (err, data) => {
					if (err) {
						return res.status(500).json(err)
					}
					return res.status(200).json('Parent email updated.')
				})
				return
			}

			// If the user is not found in the parents table, check the teachers table
			const q3 = 'SELECT * FROM teachers WHERE teacherNumber = ?'
			db.query(q3, [number], (err, data) => {
				if (err) {
					return res.status(500).json(err)
				}
				if (data.length) {
					// If the user is found in the teachers table
					const teacher = data[0]
					if (teacher.teacherEmail === email) {
						// If the entered email is the same as the old email
						return res
							.status(400)
							.json(
								'You entered your old email. Login to your account using the email, or you can reset your password if you forgot it.'
							)
					}

					// Update the teacher's email
					const q =
						'UPDATE teachers SET teacherEmail = ? WHERE teacherNumber = ?'
					db.query(q, [email, number], (err, data) => {
						if (err) {
							return res.status(500).json(err)
						}
						return res.status(200).json('Teacher email updated.')
					})
					return
				}

				// If the user is not found in any of the tables, return an error message
				return res
					.status(409)
					.json('User with the phone number you entered is not found!')
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
