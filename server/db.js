import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DB,
	connectTimeout: 300000, // 5 minutes
})

db.connect((err) => {
	if (err) {
		console.error('Error connecting to database:', err)
		return
	}
	console.log('Successfully connected to database.')
})
