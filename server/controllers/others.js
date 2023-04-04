import { db } from '../db.js'

//store announcement
export const announce = (req, res) => {
	const q =
		'INSERT INTO announce(`title`,`announcement`,`createdAt`, `createdBy`) VALUES (?, ?, NOW(), ?)'
	const values = [req.body.announceTitle, req.body.announce, req.body.adminId]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json('Announcement created.')
	})
}

//store video links
export const upload = (req, res) => {
	const q = 'INSERT INTO videos(`title`,`link`,`bookId`) VALUES (?, ?, ?)'
	const bookId = Number.parseInt(req.body.book)
	const values = [
		req.body.vidTitle,
		req.body.vidUrl,
		Number.isInteger(bookId) ? bookId : null,
	]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json("Video's link stored.")
	})
}

//store event
export const event = (req, res) => {
	const q = 'INSERT INTO event(`title`,`date`) VALUES (?, ?)'
	const values = [req.body.eveTitle, req.body.eveDate]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json('Event created.')
	})
}

//get all videos
export const getVideos = (req, res) => {
	const q = 'SELECT * FROM videos'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get videos where book id is null
export const dashVideos = (req, res) => {
	const q = 'SELECT * FROM videos WHERE book_id IS NULL'
	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}
