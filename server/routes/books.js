import express from 'express'
import { addBooks, getBooks, ownedBooks } from '../controllers/books.js'

const router = express.Router()

router.get('/get-owned/:userId', ownedBooks)
router.get('/get-books', getBooks)
router.post('/add-book', addBooks)

export default router
