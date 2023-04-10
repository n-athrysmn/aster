import express from 'express'
import {
	announce,
	dashVideos,
	delEvent,
	editAnnounce,
	editEvent,
	event,
	getAnnounce,
	getEvents,
	getVideos,
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
router.put('/edit-event/:id', editEvent)
router.delete('/delete-event/:id', delEvent)
router.put('/edit-announce/:id', editAnnounce)

export default router
