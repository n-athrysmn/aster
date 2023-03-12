const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
const bcrypt = require("bcrypt")
const saltRounds = 10

app.listen(3001, () => {
  console.log("Running on port 3001")
})

{/*DB connection*/}

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "aster_edu",
})

app.use(express.json())
app.use(cors())

app.post("/register", (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password

  db.query("SELECT * FROM students WHERE studentEmail = ?", [email], (err, result) => {
    if (err) {
      res.send(err)
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO students (stuFname, stuLname, studentEmail, studentPass) VALUES (?, ?, ?, ?)",
          [firstName, lastName, email, hash],
          (error, response) => {
            if (err) {
              res.send(err)
            }

            res.send({ msg: "Registration successful" })
          }
        )
      })
    } else {
      res.send({ msg: "Email exists" })
    }
  })
})

{/*Login verification*/}

app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
  
    db.query("SELECT * FROM students WHERE studentEmail = ?", [email], (err, result) => {
      if (err) {
        res.send(err)
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].studentPass, (error, response) => {
          if (error) {
            res.send(error)
          }
          if (response == true) {
            res.send({ msg: "Login successful" })
          } else {
            res.send({ msg: "Wrong email/password" })
          }
        })
      } else {
        res.send({ msg: "Email not registered" })
      }
    })
  })
  
  
