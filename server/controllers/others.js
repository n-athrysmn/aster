import { db } from '../db.js'
import jwt from 'jsonwebtoken'

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
	const q = 'SELECT * FROM videos WHERE bookId IS NULL'
	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get all events
export const getEvents = (req, res) => {
	const q = 'SELECT * FROM event'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get all announcements
export const getAnnounce = (req, res) => {
	const q = 'SELECT * FROM announce'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//edit event
export const editEvent = (req, res) => {
	const { id } = req.params // Get the event id from the request parameters
	console.log('id:', id)

	const q = 'UPDATE event SET `title`=?, `date`=? WHERE id = ?'

	const values = [req.body.title, req.body.date]

	db.query(q, [...values, id], (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//delete event
export const delEvent = (req, res) => {
	const token = req.cookies.access_token
	if (!token) return res.status(401).json('Not authenticated!')

	jwt.verify(token, 'jwtkey', (err, userInfo) => {
		if (err) return res.status(403).json('Token is not valid!')
		const { id } = req.params // Get the event id from the request parameters
		console.log('id:', id)

		const q = 'DELETE FROM event WHERE id = ?'

		db.query(q, [id], (err, result) => {
			if (err) {
				console.error(err)
				return res.status(500).json({ message: 'Error deleting event' })
			}
			if (result.affectedRows === 0) {
				return res.status(404).json({ message: 'Event not found' })
			}
			return res.status(200).json({ message: 'Event deleted successfully' })
		})
	})
}

//edit announcement
export const editAnnounce = (req, res) => {
	const token = req.cookies.access_token
	if (!token) return res.status(401).json('Not authenticated!')

	jwt.verify(token, 'jwtkey', (err, userInfo) => {
		if (err) return res.status(403).json('Token is not valid!')
		
	const { id } = req.params // Get the event id from the request parameters
	console.log('id:', id)

	const q = 'UPDATE announce SET `title`=?, `date`=? WHERE id = ?'

	const values = [req.body.title, req.body.date]

	db.query(q, [...values, id], (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})

		db.query(q, [id], (err, result) => {
			if (err) {
				console.error(err)
				return res.status(500).json({ message: 'Error deleting event' })
			}
			if (result.affectedRows === 0) {
				return res.status(404).json({ message: 'Event not found' })
			}
			return res.status(200).json({ message: 'Event deleted successfully' })
		})
	})

}
