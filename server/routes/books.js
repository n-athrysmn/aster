import express from "express"
import { getBarcode } from "../controllers/books.js"

const router = express.Router()

router.get("/barcode", getBarcode)

export default router