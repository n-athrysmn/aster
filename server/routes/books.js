import express from 'express'
import {
	addBook,
	addBooks,
	answers,
	bookDetails,
	deleteBook,
	editBook,
	getBooks,
	ownedBooks,
} from '../controllers/books.js'

const router = express.Router()

router.get('/get-owned/:userId', ownedBooks)
router.get('/get-books', getBooks)
router.post('/add-book', addBooks) //user dashboard
router.get('/answers/:bookIsbn', answers)
router.get('/details/:bookId', bookDetails)
router.post('/add/', addBook) //admin side
router.put('/edit/:id', editBook)
router.delete('/delete/:id', deleteBook)

export default router
