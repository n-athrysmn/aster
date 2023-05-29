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
	const selectQuery = 'SELECT id FROM videos WHERE link = ?'
	const insertQuery =
		'INSERT INTO videos(`title`,`link`,`bookId`) VALUES (?, ?, ?)'
	const bookId = Number.parseInt(req.body.book)
	const vidUrl = 'https://www.youtube.com/embed/' + req.body.vidUrl
	const values = [
		req.body.vidTitle,
		vidUrl,
		Number.isInteger(bookId) ? bookId : null,
	]

	db.query(selectQuery, [vidUrl], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length > 0) {
			// URL already exists, return error
			return res.status(400).json('Video already exists.')
		} else {
			// URL does not exist, insert into database
			db.query(insertQuery, values, (err, data) => {
				if (err) return res.status(500).json(err)
				return res.status(200).json("Video's link stored.")
			})
		}
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
export const Announce = (req, res) => {
	const q = 'SELECT * FROM announce'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//get latest announcements
export const getAnnounce = (req, res) => {
	const q = 'SELECT * FROM announce ORDER BY createdAt DESC LIMIT 1'

	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data[0])
	})
}

//edit event
export const editEvent = (req, res) => {
	const { id } = req.params // Get the event id from the request parameters
	console.log('id:', id)

	const q = 'SELECT * FROM event WHERE id = ?'
	db.query(q, [id], (err, results) => {
		if (err) return res.status(500).json(err)

		if (results.length === 0) {
			return res.status(404).json('Event not found')
		}

		const event = results[0]
		const newEvent = {
			title: req.body.title || event.title,
			date: req.body.date || event.title,
		}

		const updatedFields = []
		const values = []

		// Check which fields have been updated
		if (newEvent.title !== event.title) {
			updatedFields.push('title = ?')
			values.push(newEvent.title)
		}
		if (newEvent.date !== event.date) {
			updatedFields.push('date = ?')
			values.push(newEvent.date)
		}
		if (updatedFields.length === 0) {
			return res.status(400).json('No fields updated')
		}

		const q = 'UPDATE event SET ' + updatedFields.join(', ') + ' WHERE id = ?'

		db.query(q, [...values, id], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json('Event data has been updated.')
		})
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
	const { id } = req.params // Get the event id from the request parameters
	console.log('id:', id)

	const q = 'UPDATE announce SET `title`=?, `announcement`=? WHERE id = ?'

	const values = [req.body.title, req.body.announcement]

	db.query(q, [...values, id], (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//delete announcement
export const delAnnounce = (req, res) => {
	const { id } = req.params // Get the event id from the request parameters
	console.log('id:', id)

	const q = 'DELETE FROM announce WHERE id = ?'

	db.query(q, [id], (err, result) => {
		if (err) {
			console.error(err)
			return res.status(500).json({ message: 'Error deleting announcement' })
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Announcement not found' })
		}
		return res
			.status(200)
			.json({ message: 'Announcement deleted successfully' })
	})
}

//add task
export const addTask = (req, res) => {
	const q =
		'INSERT INTO tasks(`adminId`, `title`,`priority`, `deadline`) VALUES (?, ?, ?, ?)'
	const values = [
		req.body.adminId,
		req.body.title,
		req.body.priority,
		req.body.deadline,
	]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json('Task added.')
	})
}

//get task by admin id
export const getTask = (req, res) => {
	const { adminId } = req.params // Get the user id from the request parameters
	console.log('adminId:', adminId)

	const q = 'SELECT * FROM tasks WHERE adminId = ?'
	const values = [adminId]

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

//edit task by id
export const editTask = (req, res) => {
	const { id } = req.params // Get the task id from the request parameters
	console.log('id:', id)

	const q = 'SELECT * FROM tasks WHERE id = ?'
	db.query(q, [id], (err, results) => {
		if (err) return res.status(500).json(err)

		if (results.length === 0) {
			return res.status(404).json('Task not found')
		}

		const task = results[0]
		const newTask = {
			title: req.body.title || task.title,
			priority: req.body.priority || task.priority,
			deadline: req.body.deadline || task.deadline,
		}

		const updatedFields = []
		const values = []

		// Check which fields have been updated
		if (newTask.title !== task.title) {
			updatedFields.push('title = ?')
			values.push(newTask.title)
		}
		if (newTask.priority !== task.priority) {
			updatedFields.push('priority = ?')
			values.push(newTask.priority)
		}
		if (newTask.deadline !== task.deadline) {
			updatedFields.push('deadline = ?')
			values.push(newTask.deadline)
		}

		if (updatedFields.length === 0) {
			return res.status(400).json('No fields updated')
		}

		const q = 'UPDATE tasks SET ' + updatedFields.join(', ') + ' WHERE id = ?'

		db.query(q, [...values, id], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json('Task has been updated.')
		})
	})
}

//delete task
export const delTask = (req, res) => {
	const { id } = req.params // Get the event id from the request parameters
	console.log('id:', id)

	const q = 'DELETE FROM tasks WHERE id = ?'

	db.query(q, [id], (err, result) => {
		if (err) {
			console.error(err)
			return res.status(500).json({ message: 'Error deleting task' })
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Task not found' })
		}
		return res.status(200).json({ message: 'Task deleted successfully' })
	})
}
