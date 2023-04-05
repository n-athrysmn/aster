import { db } from '../db.js'

//get owned books
export const ownedBooks = (req, res) => {
	const { userId } = req.params // Get the user id from the request parameters
	console.log('userId:', userId)

	let q = ''
	let values = []

	if (userId) {
		// Use the userId from the request parameters instead of currentUser
		q = `SELECT books.*, ownedbooks.* FROM ownedbooks JOIN books ON ownedbooks.isbn = books.isbn WHERE ownedbooks.studentId = ? OR ownedbooks.parentId = ? OR ownedbooks.teacherId = ?`
		values = [userId, userId, userId]
	}

	console.log('values:', values)

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get all books
export const getBooks = (req, res) => {
	const q = 'SELECT * FROM books'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//add more books - user dashboard
export const addBooks = (req, res) => {
	const q =
		'INSERT INTO ownedbooks(`isbn`,`studentId`, `teacherId`, `parentId`) VALUES (?, ?, ?, ?)'
	const values = [
		req.body.isbn,
		req.body.studentId,
		req.body.teacherId,
		req.body.parentId,
	]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json('Book added.')
	})
}

//get book answers
export const answers = (req, res) => {
	const { bookIsbn } = req.params // Get the user id from the request parameters
	console.log('bookIsbn:', bookIsbn)

	const q =
		'SELECT v.* FROM videos v JOIN books b ON v.bookId = b.id JOIN ownedbooks ob ON ob.isbn = b.isbn WHERE ob.isbn = ? GROUP BY v.id'

	const values = [bookIsbn]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}
