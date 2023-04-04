import express from 'express'
import {
	announce,
	dashVideos,
	event,
	getVideos,
	upload,
} from '../controllers/others.js'

const router = express.Router()

router.post('/announce', announce)
router.post('/upload', upload)
router.post('/event', event)
router.get('/get-videos', getVideos)
router.get('/tab-videos', dashVideos)

export default router
