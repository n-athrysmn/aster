import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({
	systemvars: true,
})

export const db = mysql.createPool({
	connectionLimit: 10, // maximum number of connections
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

db.getConnection((err, connection) => {
	if (err) {
		console.error('Error connecting to database:', err)
	} else {
		console.log('Successfully connected to database 8/5/23')
		connection.release()
	}
})

export const query = (sql, params) => {
	return new Promise((resolve, reject) => {
		db.query(sql, params, (err, results) => {
			if (err) {
				console.error('Database query error:', err)
				return reject(err)
			}
			resolve(results)
		})
	})
}
