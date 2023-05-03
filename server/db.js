import mysql from 'mysql'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config()

const certPath = path.join(__dirname, 'ca-certificate.crt')

export const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DB,
	port: process.env.DB_PORT,
	connectTimeout: 300000, // 5 minutes
	ssl: {
		ca: fs.readFileSync(certPath),
		rejectUnauthorized: true,
	},
})

db.connect((err) => {
	if (err) {
		console.error('Error connecting to database:', err)
		return
	}
	console.log('Successfully connected to database.')
})
