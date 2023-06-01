import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import Toolbar from '../layout/Toolbar'
import { FaUserCircle } from 'react-icons/fa'
import Compressor from 'compressorjs'

const AdminProfile = () => {
	const pageTitle = 'Profile'
	const pageDescription = 'Welcome to the profile page'
	const { currentAdmin } = useContext(AuthContext)

	const id = currentAdmin?.id
	const [admin, setAdmin] = useState({
		adminName: '',
		adminEmail: '',
		staffId: '',
		adminPfp: '',
	})

	useEffect(() => {
		const fetchAdmin = async () => {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/admin/${id}`
				)

				const data = res.data

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
		if (admin.adminPfp) {
			setPreviewImage(
				`https://aster-server-z9ckn.ondigitalocean.app/admin/${admin.adminPfp}`
			)
		}
	}, [admin.adminPfp])

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
				`${process.env.REACT_APP_API_URL}/upload/adminImg/${id}`,
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
														{admin.adminPfp ? (
															<img
																src={previewImage}
																alt={admin.adminName}
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
													Allowed file types: png, jpg, jpeg. File size not more
													than 700kB.
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
														{admin.adminPfp ? (
															<img
																src={`https://aster-server-z9ckn.ondigitalocean.app/admin/${admin.adminPfp}`}
																alt={admin.adminName}
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
