import { db } from "../db.js"

export const announce = (req, res) => {
  const q = "INSERT INTO announce(`title`,`announcement`,`createdAt`) VALUES (?, ?, NOW(), ?)"
  const values = [req.body.announceTitle, req.body.announce]

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json("Announcement created.")
  })
}