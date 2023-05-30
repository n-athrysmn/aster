import dotenv from 'dotenv'
dotenv.config()
import multer from 'multer'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import othersRoutes from './routes/others.js'
import booksRoutes from './routes/books.js'
import uploadRoutes from './routes/upload.js'

const app = express()

const port = process.env.PORT || 3001

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
)

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/others', othersRoutes)
app.use('/api/books', booksRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/test', (req, res) => {
	res.json('It works! yehet')
})

app.use(express.static('public'))

// Error handling middleware for Multer
app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		// Multer error occurred during file upload
		res.status(400).json({ error: 'Multer error: ' + err.message })
	} else {
		// Other error occurred
		res.status(500).json({ error: 'Internal server error' })
	}
})

app.listen(port, () => {
	console.log(`Connected, running on port ${port}`)
})
