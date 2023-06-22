import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Toolbar from '../layout/Toolbar'

const UserEmail = () => {
	const { currentUser, logout } = useContext(AuthContext)
	const navigate = useNavigate()
	const pageTitle = 'Profile'
	const pageDescription = 'Change email'

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
			if (user.studentEmail !== '') {
				endpoint = 'student-edit'
			} else if (user.parentEmail !== '') {
				endpoint = 'parent-edit'
			} else if (user.teacherEmail !== '') {
				endpoint = 'teacher-edit'
			}

			await axios.put(
				`${process.env.REACT_APP_API_URL}/users/${endpoint}/${email}`,
				user
			)
			setSuccessMsg(
				'Your email has been updated successfully! Please log in again using your new email'
			)
			setError('')
			setTimeout(() => {
				setSuccessMsg('') // Clear success message
				handleLogout() // Logout the user
				navigate('/')
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
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
		<>
			<Toolbar pageTitle={pageTitle} pageDescription={pageDescription} />
			<div
				className='content d-flex flex-column flex-column-fluid'
				id='kt_content'
			>
				<div id='kt_content_container' className='container-xxl'>
					<div className='card mb-5 mb-xl-10'>
						{/*begin::Card header*/}
						<div className='card-header border-0'>
							{/*begin::Card title*/}
							<div className='card-title m-0'>
								<h3 className='fw-bold m-0'>
									{isEditing ? 'New Email Address' : 'Current Email Address'}
								</h3>
							</div>
							{/*end::Card title*/}
						</div>
						{/*begin::Card header*/}
						<form id='kt_account_profile_details_form' className='form'>
							<div className='card-body border-top p-9'>
								{/*begin::Input group*/}
								<div className='row mb-6'>
									{/*begin::Label*/}
									<label className='col-lg-4 col-form-label fw-semibold fs-6'>
										{isEditing ? 'Enter new email' : 'Current email'}
									</label>
									{/*end::Label*/}
									{/*begin::Col*/}
									{currentUser?.studentEmail && (
										<>
											<div className='col-lg-8 fv-row'>
												<input
													type='email'
													value={user.studentEmail}
													name='studentEmail'
													disabled={isDisabled}
													onChange={handleChange}
													className='form-control form-control-lg form-control-solid'
												/>
											</div>
										</>
									)}
									{currentUser?.parentEmail && (
										<>
											<div className='col-lg-8 fv-row'>
												<input
													type='email'
													value={user.parentEmail}
													name='parentEmail'
													disabled={isDisabled}
													onChange={handleChange}
													className='form-control form-control-lg form-control-solid'
												/>
											</div>
										</>
									)}
									{currentUser?.teacherEmail && (
										<>
											<div className='col-lg-8 fv-row'>
												<input
													type='email'
													value={user.teacherEmail}
													name='teacherEmail'
													disabled={isDisabled}
													onChange={handleChange}
													className='form-control form-control-lg form-control-solid'
												/>
											</div>
										</>
									)}
									{/*end::Col*/}
								</div>
								{/*end::Input group*/}
								{err && <p className='text-danger'>{err}</p>}
								{successMsg && <p className='text-success'>{successMsg}</p>}
							</div>
						</form>
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
				</div>
			</div>
		</>
	)
}

export default UserEmail
