import mysql from 'mysql'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

export const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DB,
	port: process.env.DB_PORT,
	connectTimeout: 300000, // 5 minutes
	ssl: {
		ca: fs.readFileSync(`${__dirname}/ca-certificate.crt`),
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
