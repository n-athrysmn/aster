import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getBarcode = (req, res) => {
    
  const barcode = req.params.barcode;

  const q = "SELECT * FROM books WHERE isbn = ?";
  db.query(q, [barcode], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json("Book not found.");

    return res.status(200).json(data[0]);
    
  });
}