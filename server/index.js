import express from "express"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import othersRoutes from "./routes/others.js"

const app = express()

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/others", othersRoutes)

app.get("/test", (req, res) =>{
    res.json ("It works!")
})

app.listen(8800, () => {
    console.log("Connected!")
})