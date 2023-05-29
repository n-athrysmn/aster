import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import Toolbar from '../layout/Toolbar'

const AdminProfile = () => {
	const pageTitle = 'Profile'
	const pageDescription = 'Welcome to the profile page'
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
		<>
			<Toolbar pageTitle={pageTitle} pageDescription={pageDescription} />
			<div
				id='kt_content'
				className='content d-flex flex-column flex-column-fluid'
			>
				<div id='kt_content_container' className='container-xxl'>
					<div className='card'>
						{/*begin::Card header*/}
						<div className='card-header'>
							{/*begin::Card title*/}
							<div className='card-title m-0'>
								<h3 className='fw-bold m-0'>Profile Details</h3>
							</div>
							{/*end::Card title*/}
						</div>
						{/*end::Card header*/}
						<form className='form'>
							<div className='card-body'>
								{/*begin::Input group*/}
								<div className='row mb-6'>
									{/*begin::Label*/}
									<label className='col-lg-4 col-form-label fw-semibold fs-6'>
										Name
									</label>
									{/*end::Label*/}
									{/*begin::Col*/}
									<div className='col-lg-8 fv-row'>
										<input
											type={'text'}
											value={admin.adminName}
											name='adminName'
											disabled={isDisabled}
											onChange={handleChange}
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Col*/}
								</div>
								{/*end::Input group*/}
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
											disabled
											className='form-control form-control-lg form-control-solid'
										/>
										<div className='form-text'>
											Want to change email?{' '}
											<a
												className='link'
												href={`/change-email/${admin.adminEmail}`}
											>
												Reset email here
											</a>
										</div>
									</div>
									{/*end::Col*/}
								</div>
								{/*end::Input group*/}
								{/*begin::Input group*/}
								<div className='row mb-6'>
									{/*begin::Label*/}
									<label className='col-lg-4 col-form-label fw-semibold fs-6'>
										Staff ID
									</label>
									{/*end::Label*/}
									{/*begin::Col*/}
									<div className='col-lg-8 fv-row'>
										<input
											type={'text'}
											value={admin.staffId}
											name='staffId'
											disabled={isDisabled}
											onChange={handleChange}
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Col*/}
								</div>
								{/*end::Input group*/}
							</div>
						</form>
						{err && <p className='text-danger'>{err}</p>}
						{successMsg && <p className='text-success'>{successMsg}</p>}
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

export default AdminProfile
