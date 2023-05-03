import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FaEnvelope, FaIdCard, FaUser } from 'react-icons/fa'
import { AuthContext } from '../context/authContext'

const AdminProfile = () => {
	const { currentAdmin } = useContext(AuthContext)

	const id = currentAdmin?.id
	const [admin, setAdmin] = useState({
		adminName: '',
		adminEmail: '',
		staffId: '',
	})

	useEffect(() => {
		const fetchAdmin = async () => {
			try {
				console.log('Fetching admin…')
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/admin/${id}`
				)
				console.log('Response:', res)
				const data = res.data
				console.log('Data:', data)
				setAdmin(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchAdmin()
	}, [id])

	const [isDisabled, setIsDisabled] = useState(true)
	const [isEditing, setIsEditing] = useState(false)

	const handleEditClick = () => {
		setIsDisabled(false)
		setIsEditing(true)
	}

	const handleChange = (e) => {
		setAdmin((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSaveClick = async (e) => {
		setSuccessMsg('')
		setError(null)
		setIsDisabled(true)
		setIsEditing(false)
		e.preventDefault()
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/users/admin-edit/${id}`,
				admin
			)
			setSuccessMsg('Your profile has been updated successfully!')
			setError('')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
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
							<div className='form-label'>Name</div>
							<div className='input-group input-group-icon'>
								<input
									type={'text'}
									value={admin.adminName}
									name='adminName'
									disabled={isDisabled}
									onChange={handleChange}
								/>
								<div className='input-icon'>
									<FaUser />
								</div>
							</div>
						</div>
						<div className='form-row'>
							<div className='form-label'>Email</div>
							<div className='input-group input-group-icon'>
								<input
									type={'email'}
									value={admin.adminEmail}
									name='adminEmail'
									disabled={isDisabled}
									onChange={handleChange}
								/>
								<div className='input-icon'>
									<FaEnvelope />
								</div>
							</div>
						</div>
						<div className='form-row'>
							<div className='form-label'>Number</div>
							<div className='input-group input-group-icon'>
								<input
									type={'tel'}
									value={admin.staffId}
									name='staffId'
									disabled={isDisabled}
									onChange={handleChange}
								/>
								<div className='input-icon'>
									<FaIdCard />
								</div>
							</div>
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

export default AdminProfile
