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
		'SELECT * FROM ownedbooks WHERE `isbn` = ? AND (`studentId` = ? OR `teacherId` = ? OR `parentId` = ?)'
	const values = [
		req.body.isbn,
		req.body.studentId,
		req.body.teacherId,
		req.body.parentId,
	]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length > 0) {
			return res.status(400).json('You already have this book.')
		} else {
			const q2 =
				'INSERT INTO ownedbooks(`isbn`,`studentId`, `teacherId`, `parentId`) VALUES (?, ?, ?, ?)'
			const values2 = [
				req.body.isbn,
				req.body.studentId,
				req.body.teacherId,
				req.body.parentId,
			]

			db.query(q2, values2, (err2, data2) => {
				if (err2) return res.status(500).json(err2)
				return res.status(200).json('Book added.')
			})
		}
	})
}

//get book answers
export const answers = (req, res) => {
	const { bookIsbn } = req.params // Get the book isbn from the request parameters
	console.log('bookIsbn:', bookIsbn)

	const q =
		'SELECT v.* FROM videos v JOIN books b ON v.bookId = b.id JOIN ownedbooks ob ON ob.isbn = b.isbn WHERE ob.isbn = ? GROUP BY v.id'

	const values = [bookIsbn]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get book details by id
export const bookDetails = (req, res) => {
	const { bookId } = req.params // Get the book id from the request parameters
	console.log('bookId:', bookId)

	const q = 'SELECT * FROM videos WHERE bookId = ?'

	const values = [bookId]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//add book - admin
export const addBook = (req, res) => {
	//check existing books
	const q1 = 'SELECT * FROM books WHERE isbn = ?'

	db.query(q1, [req.body.isbn], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length)
			return res.status(409).json('A book with the same ISBN exist!')

		const q = 'INSERT INTO books(`name`, `img`, `desc`, `isbn`) VALUES (?)'
		const values = [req.body.name, req.body.img, req.body.desc, req.body.isbn]

		db.query(q, [values], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json('Book has been added.')
		})
	})
}

//edit book
export const editBook = (req, res) => {
	const { id } = req.params // Get the event id from the request parameters
	console.log('id:', id)

	const q =
		'UPDATE books SET `name`=?, `img`=?, `desc`=?, `isbn`=? WHERE id = ?'

	const values = [req.body.name, req.body.img, req.body.desc, req.body.isbn]

	db.query(q, [...values, id], (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//delete book
export const deleteBook = (req, res) => {
	const { id } = req.params // Get the event id from the request parameters
	console.log('id:', id)

	const q = 'DELETE FROM books WHERE id = ?'

	db.query(q, [id], (err, result) => {
		if (err) {
			console.error(err)
			return res.status(500).json({ message: 'Error deleting book' })
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Book not found' })
		}
		return res.status(200).json({ message: 'Book deleted successfully' })
	})
}
