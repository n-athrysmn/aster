import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaEnvelope } from 'react-icons/fa'

const UserEmail = () => {
	const { currentUser, logout } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = async () => {
		await logout()
		navigate('/')
	}

	const email =
		currentUser?.studentEmail ||
		currentUser.parentEmail ||
		currentUser.teacherEmail

	const [user, setUser] = useState({
		studentEmail: currentUser?.studentEmail || '',
		teacherEmail: currentUser?.teacherEmail || '',
		parentEmail: currentUser?.parentEmail || '',
	})

	console.log('email: ', user)

	const [isDisabled, setIsDisabled] = useState(true)
	const [isEditing, setIsEditing] = useState(false)

	const handleEditClick = () => {
		setIsDisabled(false)
		setIsEditing(true)
	}

	const handleChange = (e) => {
		setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSaveClick = async (e) => {
		setSuccessMsg('')
		setError(null)
		setIsDisabled(true)
		setIsEditing(false)
		e.preventDefault()
		try {
			let endpoint = ''
			if (user.studentEmail !== null) {
				endpoint = 'student-edit'
			} else if (user.parentEmail !== null) {
				endpoint = 'parent-edit'
			} else if (user.teacherEmail !== null) {
				endpoint = 'teacher-edit'
			}

			await axios.put(
				`${process.env.REACT_APP_API_URL}/users/${endpoint}/${email}`,
				user
			)
			setSuccessMsg(
				'Your email has been updated successfully! Please log in again'
			)
			setError('')
			setTimeout(() => {
				setSuccessMsg('') // Clear success message
				handleLogout() // Logout the user
				navigate('/')
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const handleCancelClick = () => {
		window.location.reload()
		setIsDisabled(true)
		setIsEditing(false)
	}

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	return (
		<div className='profile'>
			<div className='profile-card'>
				<div className='info'>
					<form className='form-profile'>
						<div className='form-row'>
							<div className='form-label'>Email</div>
							{currentUser?.studentEmail && (
								<>
									<div className='input-group input-group-icon'>
										<input
											type='email'
											value={user.studentEmail}
											name='studentEmail'
											disabled={isDisabled}
											onChange={handleChange}
										/>
										<div className='input-icon'>
											<FaEnvelope />
										</div>
									</div>
								</>
							)}
							{currentUser?.parentEmail && (
								<>
									<div className='input-group input-group-icon'>
										<input
											type='email'
											value={user.parentEmail}
											name='parentEmail'
											disabled={isDisabled}
											onChange={handleChange}
										/>
										<div className='input-icon'>
											<FaEnvelope />
										</div>
									</div>
								</>
							)}
							{currentUser?.teacherEmail && (
								<>
									<div className='input-group input-group-icon'>
										<input
											type='email'
											value={user.teacherEmail}
											name='teacherEmail'
											disabled={isDisabled}
											onChange={handleChange}
										/>
										<div className='input-icon'>
											<FaEnvelope />
										</div>
									</div>
								</>
							)}
						</div>
					</form>
					{err && <p className='txt-danger'>{err}</p>}
					{successMsg && <p className='txt-success'>{successMsg}</p>}
					{isEditing ? (
						<>
							<button onClick={handleSaveClick} className='btn btn-success'>
								Save
							</button>
							<button onClick={handleCancelClick} className='btn btn-danger'>
								Cancel
							</button>
						</>
					) : (
						<button onClick={handleEditClick} className='btn btn-primary'>
							Edit
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default UserEmail
