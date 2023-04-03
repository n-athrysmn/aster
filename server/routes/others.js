import express from "express"
import { announce } from "../controllers/others.js"

const router = express.Router()

router.post("/announce", announce)

export default router