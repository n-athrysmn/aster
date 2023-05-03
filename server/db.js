import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createConnection({
	host: 'asteredu-do-user-14006470-0.b.db.ondigitalocean.com',
	port: '25060',
	user: 'doadmin',
	password: 'AVNS_xn_NMT87GBj6KMIcdwd',
	database: 'defaultdb',
	sslmode: 'REQUIRED',
})

db.connect((err) => {
	if (err) {
		console.error('Error connecting to database:', err)
		return
	}
	console.log('Successfully connected to database.')
})
