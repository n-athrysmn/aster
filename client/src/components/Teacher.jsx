import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { FaUserCircle } from 'react-icons/fa'
import Compressor from 'compressorjs'

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
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/getTeacher/${email}`
				)

				const data = res.data

				setTeacher(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchTeacher()
	}, [email])

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
	const [compressedImage, setCompressedImage] = useState(null)
	const [previewImage, setPreviewImage] = useState('')

	useEffect(() => {
		if (teacher.teacherPfp) {
			setPreviewImage(
				`https://aster-server-z9ckn.ondigitalocean.app/teacher/${teacher.teacherPfp}`
			)
		}
	}, [teacher.teacherPfp])

	const compressImage = (file) => {
		const maxSize = 400 * 1024 // Set the minimum size to 700kb (in bytes)

		if (file.size > maxSize) {
			try {
				new Compressor(file, {
					quality: 0.6,
					maxWidth: 300,
					maxHeight: 300,
					crop: true, // Enable cropping
					maxSize: 300 * 1024, // Set the maximum size to 500kb (in bytes)
					success: (compressedFile) => {
						// Handle the compressed image here
						setCompressedImage(compressedFile)
					},
					error: (error) => {
						console.error('Image compression error:', error)
					},
				})
			} catch (error) {
				console.error('Image compression error:', error)
			}
		} else {
			// Image does not meet the minimum size requirement, handle it here (e.g., do not compress)
			setCompressedImage(file)
		}
	}

	const handleFile = (e) => {
		const selectedFile = e.target.files[0]
		if (selectedFile) {
			compressImage(selectedFile)

			const reader = new FileReader()
			reader.onload = () => {
				setPreviewImage(reader.result)
			}
			reader.readAsDataURL(selectedFile)
		}
	}

	const handleUpdload = async (e) => {
		e.preventDefault()
		const formData = new FormData()
		try {
			const file = new File([compressedImage], ' ', { type: 'image/jpeg' })
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
													src={previewImage}
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
													src={`https://aster-server-z9ckn.ondigitalocean.app/teacher/${teacher.teacherPfp}`}
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
