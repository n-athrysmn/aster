import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { FaUserCircle } from 'react-icons/fa'

const Teacher = () => {
	const location = useLocation()
	const email = location.pathname.split('/')[2]
	const [teacher, setTeacher] = useState({
		teacherName: '',
		teacherEmail: '',
		teacherNumber: '',
		teacherSch: '',
		teacherSalary: '',
		teacherAddr: '',
		teacherPfp: '',
	})

	useEffect(() => {
		const fetchTeacher = async () => {
			try {
				console.log('Fetching teacher…')
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/getTeacher/${email}`
				)
				console.log('Response:', res)
				const data = res.data
				console.log('Data:', data)
				setTeacher(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchTeacher()
	}, [email])

	console.log('teacher: ', teacher)

	const [isDisabled, setIsDisabled] = useState(true)
	const [isEditing, setIsEditing] = useState(false)

	const handleEditClick = () => {
		setIsDisabled(false)
		setIsEditing(true)
	}

	const handleChange = (e) => {
		setTeacher((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSaveClick = async (e) => {
		setSuccessMsg('')
		setError(null)
		setIsDisabled(true)
		setIsEditing(false)
		e.preventDefault()
		if (!/^(?!0123456789)\d{10,11}$/.test(teacher.teacherNumber)) {
			setError('Invalid phone number')
			setTimeout(() => {
				window.location.reload()
			}, 3000)
			return
		}
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/users/teacher-edit/${email}`,
				teacher
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

	const [errUp, setErrorUp] = useState(null)
	const [successUp, setSuccessUp] = useState('')

	const [file, setFile] = useState()

	const handleFile = (e) => {
		setFile(e.target.files[0])
	}

	const handleUpdload = async (e) => {
		e.preventDefault()
		const formData = new FormData()
		try {
			formData.append('image', file)
			await axios.post(
				`${process.env.REACT_APP_API_URL}/upload/teacherImg/${email}`,
				formData
			)
			setSuccessUp('Profile picture updated!')
			setErrorUp('')
			setTimeout(() => {
				setSuccessUp('')
				window.location.reload()
			}, 3000)
		} catch (errUp) {
			setErrorUp(`Error: file too large!`)
			console.log(err)
		}
	}

	return (
		<>
			<form className='form'>
				<div className='card-body border-top p-9'>
					{/*begin::Input group*/}
					<div className='row mb-6'>
						{/*begin::Label*/}
						<label className='col-lg-4 col-form-label fw-semibold fs-6'>
							Avatar
						</label>
						{/*end::Label*/}
						{/*begin::Col*/}
						<div className='col-lg-8'>
							{isEditing ? (
								<>
									{/*begin::Image input*/}
									<div
										className='image-input image-input-outline'
										data-kt-image-input='true'
									>
										{/*begin::Preview existing avatar*/}
										<div
											className='image-input-wrapper w-125px h-125px'
											id='avatar-preview'
										>
											{teacher.teacherPfp ? (
												<img
													src={`http://localhost:8800/teacher/${teacher.teacherPfp}`}
													alt={teacher.teacherName}
													className='w-100 h-100'
												/>
											) : (
												<FaUserCircle className='w-100 h-100' />
											)}
										</div>

										{/*end::Preview existing avatar*/}
									</div>
									<div className='form-text'>
										<input type={'file'} onChange={handleFile} />
										<button
											className='btn btn-sm btn-primary'
											onClick={handleUpdload}
										>
											Upload
										</button>
									</div>
									{/*end::Image input*/}
									{/*begin::Hint*/}
									<div className='form-text'>
										Allowed file types: png, jpg, jpeg. File size not more than
										700kB.
									</div>
									{errUp && <p className='text-danger mt-8'>{errUp}</p>}
									{successUp && (
										<p className='text-success mt-8'>{successUp}</p>
									)}
									{/*end::Hint*/}
								</>
							) : (
								<>
									{/*begin::Image input*/}
									<div
										className='image-input image-input-outline'
										data-kt-image-input='true'
									>
										{/*begin::Preview existing avatar*/}
										<div
											className='image-input-wrapper w-125px h-125px'
											id='avatar-preview'
										>
											{teacher.teacherPfp ? (
												<img
													src={`http://localhost:8800/teacher/${teacher.teacherPfp}`}
													alt={teacher.teacherName}
													className='w-100 h-100'
												/>
											) : (
												<FaUserCircle className='w-100 h-100' />
											)}
										</div>

										{/*end::Preview existing avatar*/}
									</div>
								</>
							)}
						</div>
						{/*end::Col*/}
					</div>
					{/*end::Input group*/}
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
								value={teacher.teacherName}
								name='teacherName'
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
								value={teacher.teacherEmail}
								name='teacherEmail'
								disabled
								className='form-control form-control-lg form-control-solid'
							/>
							<div className='form-text'>
								Want to change email?{' '}
								<a
									className='link'
									href={`/reset-email/${teacher.teacherEmail}`}
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
							Phone Number
						</label>
						{/*end::Label*/}
						{/*begin::Col*/}
						<div className='col-lg-8 fv-row'>
							<input
								type={'tel'}
								value={teacher.teacherNumber}
								name='teacherNumber'
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
								name='teacherAddr'
								value={teacher.teacherAddr}
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
							School Name
						</label>
						{/*end::Label*/}
						{/*begin::Col*/}
						<div className='col-lg-8 fv-row'>
							<input
								type={'text'}
								value={teacher.teacherSch}
								name='teacherSch'
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
								name='teacherSalary'
								value={teacher.teacherSalary}
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

export default Teacher
