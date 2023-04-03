import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import avatar from '../assets/avatar.png'
import { AuthContext } from '../context/authContext'
import {
	FaUserGraduate,
	FaEnvelope,
	FaPhoneAlt,
	FaBirthdayCake,
	FaHome,
	FaSchool,
	FaLeanpub,
	FaTrophy,
	FaBriefcase,
	FaMoneyCheckAlt,
	FaUserAlt,
} from 'react-icons/fa'

const Profile = () => {
	const [inputs, setInputs] = useState({
		name: '',
		number: '',
		birthday: '',
		address: '',
		school: '',
		level: '',
		grade: '',
		pfp: '',
		email: '',
		password: '',
	})

	const [err, setError] = useState(null)
	console.log(inputs)

	const {
		currentUser: {
			studentName,
			studentEmail,
			studentNumber,
			studentBirth,
			studentAddr,
			studentSch,
			studentLevel,
			studentGrade,
			studentPfp,
			parentName,
			parentEmail,
			parentNumber,
			parentAddr,
			parentJob,
			parentSalary,
			parentPfp,
			teacherName,
			teacherEmail,
			teacherNumber,
			teacherSch,
			teacherSalary,
			teacherAddr,
			teacherPfp,
		},
	} = useContext(AuthContext)

	const date = new Date(studentBirth)
	const formattedDate = date
		.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		})
		.replace(/\//g, '/')

	const [isEditing, setIsEditing] = useState(false)

	const [updatedProfileData, setUpdatedProfileData] = useState({})
	const navigate = useNavigate()

	const handleToggleEditMode = () => {
		setIsEditing(!isEditing)
		if (isEditing) {
			const inputs = document.querySelectorAll(
				'.form-profile input, .form-profile textarea'
			)
			const updatedData = {}
			inputs.forEach((input) => {
				updatedData[input.name] = input.value
			})
			setUpdatedProfileData(updatedData)
		}
	}

	const handleCancelEdit = () => {
		setIsEditing(false)
		const inputs = document.querySelectorAll(
			'.form-profile input, .form-profile textarea'
		)
		inputs.forEach((input) => {
			input.value = input.defaultValue
		})
		if (studentName) {
			setPreviewUrl(studentPfp)
		} else if (parentName) {
			setPreviewUrl(parentPfp)
		} else if (teacherName) {
			setPreviewUrl(teacherPfp)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/auth/register', inputs)
			navigate('/')
		} catch (err) {
			setError(err.response.data)
		}
	}

	const [previewUrl, setPreviewUrl] = useState(null)

	const handleFileInputChange = (e) => {
		const file = e.target.files[0]
		const imageUrl = URL.createObjectURL(file)
		setInputs((prev) => ({ ...prev, [e.target.name]: file }))
		setPreviewUrl(imageUrl)
	}

	return (
		<div className='profile'>
			<h1>Profile Details</h1>
			<div className='profile-card'>
				<div className='info'>
					<form className='form-profile' onSubmit={handleSubmit}>
						{studentName && (
							<>
								<div className='avatar-row'>
									<div className='avatar mb20'>
										<input
											type='file'
											id='file'
											style={{ display: 'none' }}
											onChange={handleFileInputChange}
											name='pfp'
										/>
										{isEditing ? (
											<label htmlFor='file'>
												{previewUrl ? (
													<img src={previewUrl} alt='avatar' />
												) : (
													<img src={studentPfp} alt='avatar' />
												)}
											</label>
										) : (
											<img src={studentPfp} alt='avatar' />
										)}
									</div>
									{isEditing ? (
										<div className='form-label'>
											Click the image to change your picture
										</div>
									) : null}
								</div>
								<div className='form-row'>
									<div className='form-label'>Name</div>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={studentName}
											disabled={!isEditing}
											name='studentName'
										/>
										<div className='input-icon'>
											<FaUserGraduate />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='form-label'>Email</div>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={studentEmail}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaEnvelope />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='form-label'>Phone Number</div>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={studentNumber}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaPhoneAlt />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='form-label'>Birth date</div>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={formattedDate}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaBirthdayCake />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='form-label'>Address</div>
									<div className='input-group input-group-icon'>
										<textarea
											defaultValue={studentAddr}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaHome />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='form-label'>School Name</div>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={studentSch}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaSchool />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='form-label'>Education Level</div>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={studentLevel}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaLeanpub />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='form-label'>Mathematics Grade</div>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={studentGrade}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaTrophy />
										</div>
									</div>
								</div>
							</>
						)}
						{parentName && (
							<>
								<div className='avatar-row'>
									<div className='avatar mb20'>
										<input
											type='file'
											id='file'
											style={{ display: 'none' }}
											onChange={handleFileInputChange}
											name='pfp'
										/>
										{isEditing ? (
											<label htmlFor='file'>
												{previewUrl ? (
													<img src={previewUrl} alt='avatar' />
												) : (
													<img src={parentPfp} alt='avatar' />
												)}
											</label>
										) : (
											<img src={parentPfp} alt='avatar' />
										)}
									</div>
									{isEditing ? (
										<div className='form-label'>
											Click the image to change your picture
										</div>
									) : null}
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={parentName}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaUserAlt />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={parentEmail}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaEnvelope />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={parentNumber}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaPhoneAlt />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<textarea defaultValue={parentAddr} disabled={!isEditing} />
										<div className='input-icon'>
											<FaHome />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={parentJob}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaBriefcase />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={parentSalary}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaMoneyCheckAlt />
										</div>
									</div>
								</div>
							</>
						)}
						{teacherName && (
							<>
								<div className='avatar-row'>
									<div className='avatar mb20'>
										<input
											type='file'
											id='file'
											style={{ display: 'none' }}
											onChange={handleFileInputChange}
											name='pfp'
										/>
										{isEditing ? (
											<label htmlFor='file'>
												{previewUrl ? (
													<img src={previewUrl} alt='avatar' />
												) : (
													<img src={teacherPfp} alt='avatar' />
												)}
											</label>
										) : (
											<img src={teacherPfp} alt='avatar' />
										)}
									</div>
									{isEditing ? (
										<div className='form-label'>
											Click the image to change your picture
										</div>
									) : null}
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={teacherName}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaUserAlt />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={teacherEmail}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaEnvelope />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={teacherNumber}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaPhoneAlt />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<textarea
											defaultValue={teacherAddr}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaHome />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={teacherSch}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaBriefcase />
										</div>
									</div>
								</div>
								<div className='form-row'>
									<div className='input-group input-group-icon'>
										<input
											type={'text'}
											defaultValue={teacherSalary}
											disabled={!isEditing}
										/>
										<div className='input-icon'>
											<FaMoneyCheckAlt />
										</div>
									</div>
								</div>
							</>
						)}
						{isEditing && (
							<div className='button-group'>
								{err && <p>{err}</p>}
								<button
									type='button'
									className='success-btn'
									//className={`primary-btn ${isEditing ? 'success-btn' : ''}`} //if button have different styles
									onClick={handleToggleEditMode}
								>
									Save Changes
								</button>
								<button
									type='button'
									className='danger-btn'
									onClick={handleCancelEdit}
								>
									Cancel
								</button>
							</div>
						)}
						{!isEditing && (
							<button
								type='button'
								className='primary-btn'
								onClick={handleToggleEditMode}
							>
								Edit Profile
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Profile
