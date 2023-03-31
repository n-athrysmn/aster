import express from "express"
import { parentedit, studentedit, teacheredit } from "../controllers/user"

const router = express.Router()

router.put("/:id", useredit);

export default router