import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({
	systemvars: true,
})

export const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DB,
	port: process.env.DB_PORT,
	connectTimeout: 300000, // 5 minutes
	ssl: {
		rejectUnauthorized: false,
		ca: process.env.NODE_EXTRA_CA_CERTS,
	},
	insecureAuth: true,
})

db.connect((err) => {
	if (err) {
		console.error('Error connecting to database:', err)
		return
	}
	console.log('Successfully connected to database.')
})
