import express from "express"
import { register, parent, login, logout } from "../controllers/auth.js"

const router = express.Router()

router.post("/register", register)
router.post("/parent-register", parent)
router.post("/login", login)
router.post("/logout", logout)

export default router