import { db } from '../db.js'

//get owned books
export const ownedBooks = (req, res) => {
	const { userId } = req.params // Get the user id from the request parameters
	console.log('userId:', userId)

	let q = ''
	let values = []

	if (userId) {
		// Use the userId from the request parameters instead of currentUser
		q = `SELECT books.*, ownedbooks.* FROM ownedbooks JOIN books ON ownedbooks.isbn = books.isbn WHERE ownedbooks.studentId = ? OR ownedbooks.parentId = ? OR ownedbooks.teacherId = ? ORDER BY books.id ASC`
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

	const q = `SELECT v.*, CAST(SUBSTRING_INDEX(REPLACE(REPLACE(title, 'QUESTION', ''), 'Q', ''), ' ', -1) AS SIGNED) AS question_number 
		FROM videos v 
		JOIN books b ON v.bookId = b.id 
		JOIN ownedbooks ob ON ob.isbn = b.isbn 
		WHERE ob.isbn = ? 
		GROUP BY v.id
		ORDER BY question_number`

	const values = [bookIsbn]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get book details by id
export const bookDetails = (req, res) => {
	const { bookId } = req.params
	console.log('bookId:', bookId)

	const q = `SELECT *, 
	CAST(SUBSTRING_INDEX(REPLACE(REPLACE(title, 'QUESTION', ''), 'Q', ''), ' ', -1) AS SIGNED) AS question_number
  FROM videos 
  WHERE bookId = ? 
  ORDER BY question_number` //using cast to sort data despite the format difference

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

		const q =
			'INSERT INTO books(`name`, `img`, `desc`, `isbn`, `pdf`) VALUES (?)'
		const values = [
			req.body.name,
			req.body.img,
			req.body.desc,
			req.body.isbn,
			req.body.pdf,
		]

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
		'UPDATE books SET `name`=?, `img`=?, `desc`=?, `isbn`=?, `pdf`=? WHERE id = ?'

	const values = [
		req.body.name,
		req.body.img,
		req.body.desc,
		req.body.isbn,
		req.body.pdf,
	]

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

//edit video
export const editVideo = (req, res) => {
	const { id } = req.params // Get the event id from the request parameters
	console.log('id:', id)

	const q = 'SELECT * FROM videos WHERE id = ?'
	db.query(q, [id], (err, results) => {
		if (err) return res.status(500).json(err)

		if (results.length === 0) {
			return res.status(404).json('Video not found')
		}

		const video = results[0]
		const newVideo = {
			title: req.body.title || video.title,
			link: req.body.link || video.link,
		}

		const updatedFields = []
		const values = []

		// Check which fields have been updated
		if (newVideo.title !== video.title) {
			updatedFields.push('title = ?')
			values.push(newVideo.title)
		}
		if (newVideo.link !== video.link) {
			updatedFields.push('link = ?')
			values.push(newVideo.link)
		}

		if (updatedFields.length === 0) {
			return res.status(400).json('No fields updated')
		}

		const q = 'UPDATE videos SET ' + updatedFields.join(', ') + ' WHERE id = ?'

		db.query(q, [...values, id], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json('Video data has been updated.')
		})
	})
}

//delete video
export const deleteVideo = (req, res) => {
	const { id } = req.params // Get the event id from the request parameters
	console.log('id:', id)

	const q = 'DELETE FROM videos WHERE id = ?'

	db.query(q, [id], (err, result) => {
		if (err) {
			console.error(err)
			return res.status(500).json({ message: 'Error deleting video' })
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Video not found' })
		}
		return res.status(200).json({ message: 'Video deleted successfully' })
	})
}

//get all videos where book is null
export const getVids = (req, res) => {
	const q = `SELECT * FROM videos WHERE bookId IS NULL`

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get book pdf
export const getPdf = (req, res) => {
	const { bookIsbn } = req.params
	const q = `SELECT * FROM books WHERE isbn = ?`

	const values = [bookIsbn]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data[0])
	})
}

//get all videos
export const getAll = (req, res) => {
	const q = `SELECT * FROM videos`

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}
