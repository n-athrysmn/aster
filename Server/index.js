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

{/*Student Registration*/}

app.post("/register", (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const number = req.body.number
  const birthday = req.body.birthday
  const address = req.body.address
  const level = req.body.level
  const school = req.body.school
  const grade = req.body.grade
  const pfp = req.body.pfp
  const password = req.body.password

  db.query("SELECT * FROM students WHERE studentEmail = ?", [email], (err, result) => {
    if (err) {
      res.send(err)
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO students (studentName, studentEmail, studentNumber, studentBirth, studentAddr, studentLevel, studentSch, studentGrade, studentPfp, studentPass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [name, email, number, birthday, address, level, school, grade, pfp, hash],
          (error, response) => 
          {if (error) {
            res.send(error)
            console.log(error)
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

{/*Parent Registration*/}

app.post("/parent-register", (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const number = req.body.number
  const job = req.body.job
  const salary = req.body.salary
  const address = req.body.address
  const child = req.body.child
  const pfp = req.body.pfp
  const password = req.body.password

  db.query("SELECT * FROM parents WHERE parentEmail = ?", [email], (err, result) => {
    if (err) {
      res.send(err)
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO parents (parentName, parentEmail, parentNumber, parentJob, parentSalary, parentAddr, parentChild, parentPfp, parentPass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [name, email, number, job, salary, address, child, pfp, hash],
          (error, response) => 
          {if (error) {
            res.send(error)
            console.log(error)
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
  console.log("Received request to login:", req.body); // Add this line to check if the email and password values are being received correctly

  const email = req.body.email
  const password = req.body.password

  db.query(
    "SELECT 'student' as userType, studentID as userID, studentPass as password, studentEmail as email FROM students WHERE studentEmail = ? UNION ALL SELECT 'parent' as userType, parentID as userID, parentPass as password, parentEmail as email FROM parents WHERE parentEmail = ?",
    [email, email],
    (err, results) => {
      if (err) {
        console.log("Error while logging in:", err); // Add this line to check if there are any errors in the database query
        res.send(err)
      } else {
        console.log("Results from database query:", results); // Add this line to check the results of the database query
        if (results.length > 0) {
          const result = results[0]
          bcrypt.compare(password, result.password, (error, response) => {
            if (error) {
              console.log("Error while comparing passwords:", error); // Add this line to check if there are any errors while comparing passwords
              res.send(error)
            } else {
              if (response) {
                console.log("Login successful:", { msg: "Login successful", userType: result.userType, userID: result.userID }); // Add this line to check the response being sent back to the front-end
                res.send({ msg: "Login successful", userType: result.userType, userID: result.userID })
              } else {
                console.log("Wrong email/password:", { msg: "Wrong email/password" }); // Add this line to check the response being sent back to the front-end
                res.send({ msg: "Wrong email/password" })
              }
            }
          })
        } else {
          console.log("Email not registered:", { msg: "Email not registered" }); // Add this line to check the response being sent back to the front-end
          res.send({ msg: "Email not registered" })
        }
      }
    }
  )
})

  
  
