import express from 'express'
import {
	addBook,
	addBooks,
	answers,
	bookDetails,
	deleteBook,
	deleteVideo,
	editBook,
	editVideo,
	getAll,
	getBooks,
	getPdf,
	getVids,
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
router.put('/edit-video/:id', editVideo) //book details page
router.delete('/delete-video/:id', deleteVideo) //book details page
router.get('/get-videos', getVids)
router.get('/getPdf/:bookIsbn', getPdf)
router.get('/getAll', getAll)

export default router
