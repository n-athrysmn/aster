import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const ResetEmail = () => {
	const { currentAdmin, logout } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = async () => {
		await logout()
		navigate('/admin')
	}

	const id = currentAdmin?.id

	const [admin, setAdmin] = useState({
		adminEmail: '',
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

	console.log('admin email fetched: ', admin)

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
			setSuccessMsg(
				'Your email has been updated successfully! Please log in again using your new email'
			)
			setError('')
			setTimeout(() => {
				setSuccessMsg('') // Clear success message
				handleLogout() // Logout the user
				navigate('/admin')
			}, 5000)
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
		<div id='kt_account_settings_profile_details' className='collapse show'>
			<form id='kt_account_profile_details_form' className='form'>
				<div className='card-body border-top p-9'>
					{/*begin::Input group*/}
					<div className='row mb-6'>
						{/*begin::Label*/}
						<label className='col-lg-4 col-form-label fw-semibold fs-6'>
							Email
						</label>
						{/*end::Label*/}
						{/*begin::Col*/}
						<div className='col-lg-8 fv-row'>
							<input
								type={'email'}
								value={admin.adminEmail}
								name='adminEmail'
								disabled={isDisabled}
								onChange={handleChange}
							/>
						</div>
						{/*end::Col*/}
					</div>
					{/*end::Input group*/}
				</div>
			</form>
			{err && <p className='txt-danger'>{err}</p>}
			{successMsg && <p className='txt-success'>{successMsg}</p>}
			<div className='card-footer d-flex justify-content-end py-6 px-9'>
				{isEditing ? (
					<>
						<button
							onClick={handleCancelClick}
							className='btn btn-light btn-active-light-danger me-2'
						>
							Cancel
						</button>
						<button onClick={handleSaveClick} className='btn btn-success'>
							Save
						</button>
					</>
				) : (
					<button onClick={handleEditClick} className='btn btn-primary'>
						Edit
					</button>
				)}
			</div>
		</div>
	)
}

export default ResetEmail
