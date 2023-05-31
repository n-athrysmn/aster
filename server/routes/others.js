import express from 'express'
import {
	Announce,
	addTask,
	announce,
	dashVideos,
	delAnnounce,
	delEvent,
	delTask,
	editAnnounce,
	editEvent,
	editTask,
	event,
	getAnnounce,
	getEvents,
	getTask,
	getVideos,
	taskDone,
	upload,
} from '../controllers/others.js'

const router = express.Router()

router.post('/announce', announce)
router.post('/upload', upload)
router.post('/event', event)
router.get('/get-videos', getVideos)
router.get('/tab-videos', dashVideos)
router.get('/get-events', getEvents)
router.get('/get-announce', getAnnounce)
router.get('/announce', Announce)
router.put('/edit-event/:id', editEvent)
router.delete('/delete-event/:id', delEvent)
router.put('/edit-announce/:id', editAnnounce)
router.delete('/delete-announce/:id', delAnnounce)
router.post('/add-task', addTask)
router.get('/get-tasks/:adminId', getTask)
router.put('/edit-tasks/:id', editTask)
router.put('/task-done/:id', taskDone)
router.delete('/delete-task/:id', delTask)

export default router
