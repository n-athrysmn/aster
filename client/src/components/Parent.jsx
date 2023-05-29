import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Parent = () => {
	const location = useLocation()
	const email = location.pathname.split('/')[2]
	const [parent, setParent] = useState({
		parentName: '',
		parentEmail: '',
		parentNumber: '',
		parentAddr: '',
		parentJob: '',
		parentSalary: '',
	})

	useEffect(() => {
		const fetchParent = async () => {
			try {
				console.log('Fetching parent…')
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/getParent/${email}`
				)
				console.log('Response:', res)
				const data = res.data
				console.log('Data:', data)
				setParent(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchParent()
	}, [email])

	const [isDisabled, setIsDisabled] = useState(true)
	const [isEditing, setIsEditing] = useState(false)

	const handleEditClick = () => {
		setIsDisabled(false)
		setIsEditing(true)
	}

	const handleChange = (e) => {
		setParent((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSaveClick = async (e) => {
		setSuccessMsg('')
		setError(null)
		setIsDisabled(true)
		setIsEditing(false)
		e.preventDefault()
		if (!/^(?!0123456789)\d{10,11}$/.test(parent.parentNumber)) {
			setError('Invalid phone number')
			setTimeout(() => {
				window.location.reload()
			}, 3000)
			return
		}
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/users/parent-edit/${email}`,
				parent
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
			<form className='form'>
				<div className='card-body border-top p-9'>
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
								value={parent.parentName}
								name='parentName'
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
								value={parent.parentEmail}
								name='parentEmail'
								disabled
								className='form-control form-control-lg form-control-solid'
							/>
							<div className='form-text'>
								Want to change email?{' '}
								<a className='link' href={`/reset-email/${parent.parentEmail}`}>
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
							Phone Number
						</label>
						{/*end::Label*/}
						{/*begin::Col*/}
						<div className='col-lg-8 fv-row'>
							<input
								type={'tel'}
								value={parent.parentNumber}
								name='parentNumber'
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
							Address
						</label>
						{/*end::Label*/}
						{/*begin::Col*/}
						<div className='col-lg-8 fv-row'>
							<textarea
								name='parentAddr'
								value={parent.parentAddr}
								disabled={isDisabled}
								onChange={handleChange}
								className='form-control form-control-lg form-control-solid'
								rows='3'
							/>
						</div>
						{/*end::Col*/}
					</div>
					{/*end::Input group*/}
					{/*begin::Input group*/}
					<div className='row mb-6'>
						{/*begin::Label*/}
						<label className='col-lg-4 col-form-label fw-semibold fs-6'>
							Occupation
						</label>
						{/*end::Label*/}
						{/*begin::Col*/}
						<div className='col-lg-8 fv-row'>
							<input
								type={'text'}
								name='parentJob'
								value={parent.parentJob}
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
							Salary range
						</label>
						{/*end::Label*/}
						{/*begin::Col*/}
						<div className='col-lg-8 fv-row'>
							<select
								name='parentSalary'
								value={parent.parentSalary}
								disabled={isDisabled}
								onChange={handleChange}
								className='form-select form-select-solid form-select-lg fw-semibold'
							>
								<option value=''>Select salary range</option>
								<option value='T20'>T20</option>
								<option value='M40'>M40</option>
								<option value='B40'>B40</option>
							</select>
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
		</>
	)
}

export default Parent
