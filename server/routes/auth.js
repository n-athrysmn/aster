import express from "express"
import { register, parent, login, logout, teacher, admins, adminlogin } from "../controllers/auth.js"

const router = express.Router()

router.post("/register", register)
router.post("/parent-register", parent)
router.post("/teacher-register", teacher)
router.post("/admin-register", admins)
router.post("/admin-login", adminlogin)
router.post("/login", login)
router.post("/logout", logout)

export default router