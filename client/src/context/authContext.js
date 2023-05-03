import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	)

	const [currentAdmin, setCurrentAdmin] = useState(
		JSON.parse(localStorage.getItem('admin')) || null
	)

	const isLoggedIn = !!currentUser || !!currentAdmin

	const login = async (inputs) => {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/auth/login`,
			inputs
		)
		setCurrentUser('Current user', data)
		console.log(data)
	}

	const admin = async (inputs) => {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/auth/admin-login`,
			inputs
		)
		setCurrentAdmin('Current admin', data)
	}

	const logout = async () => {
		await axios.post('/auth/logout')
		setCurrentUser(null)
		setCurrentAdmin(null)
	}

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser))
	}, [currentUser])

	useEffect(() => {
		localStorage.setItem('admin', JSON.stringify(currentAdmin))
	}, [currentAdmin])

	const contextValue = {
		currentUser,
		currentAdmin,
		isLoggedIn,
		login,
		admin,
		logout,
	}

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	)
}
