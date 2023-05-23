import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Student = () => {
	const location = useLocation()
	const email = location.pathname.split('/')[2]
	const [student, setStudent] = useState({
		studentName: '',
		studentEmail: '',
		studentNumber: '',
		studentAddr: '',
		studentSch: '',
		studentLevel: '',
		studentGrade: '',
	})

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				console.log('Fetching student…')
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/getStudent/${email}`
				)
				console.log('Response:', res)
				const data = res.data
				console.log('Data:', data)
				setStudent(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchStudent()
	}, [email])

	const [isDisabled, setIsDisabled] = useState(true)
	const [isEditing, setIsEditing] = useState(false)

	const handleEditClick = () => {
		setIsDisabled(false)
		setIsEditing(true)
	}

	const handleChange = (e) => {
		setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSaveClick = async (e) => {
		setSuccessMsg('')
		setError(null)
		setIsDisabled(true)
		setIsEditing(false)
		e.preventDefault()
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/users/student-edit/${email}`,
				student
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
		<div id='kt_account_settings_profile_details' className='collapse show'>
			<form id='kt_account_profile_details_form' className='form'>
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
								value={student.studentName}
								name='studentName'
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
								value={student.studentEmail}
								name='studentEmail'
								disabled
								className='form-control form-control-lg form-control-solid'
							/>
							<div className='form-text'>
								Want to change email?{' '}
								<a
									className='link'
									href={`/reset-email/${student.studentEmail}`}
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
								value={student.studentNumber}
								name='studentNumber'
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
								name='studentAddr'
								value={student.studentAddr}
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
								value={student.studentSch}
								name='studentSch'
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
							Education Level
						</label>
						{/*end::Label*/}
						{/*begin::Col*/}
						<div className='col-lg-8 fv-row'>
							<select
								name='studentLevel'
								onChange={handleChange}
								value={student.studentLevel}
								disabled={isDisabled}
								className='form-select form-select-solid form-select-lg fw-semibold'
							>
								<option value=''>Select your education level</option>
								<optgroup label='Form'>
									<option value='Form-1'>Form 1</option>
									<option value='Form-2'>Form 2</option>
									<option value='Form-3'>Form 3</option>
									<option value='Form-4'>Form 4</option>
									<option value='Form-5'>Form 5</option>
								</optgroup>
								<optgroup label='Grade'>
									<option value='Grade-1'>Grade 1</option>
									<option value='Grade-2'>Grade 2</option>
									<option value='Grade-3'>Grade 3</option>
									<option value='Grade-4'>Grade 4</option>
									<option value='Grade-5'>Grade 5</option>
									<option value='Grade-6'>Grade 6</option>
								</optgroup>
							</select>
						</div>
						{/*end::Col*/}
					</div>
					{/*end::Input group*/}
					{/*begin::Input group*/}
					<div className='row mb-6'>
						{/*begin::Label*/}
						<label className='col-lg-4 col-form-label fw-semibold fs-6'>
							Mathematics Grade
						</label>
						{/*end::Label*/}
						{/*begin::Col*/}
						<div className='col-lg-8 fv-row'>
							<select
								value={student.studentGrade}
								name='studentGrade'
								disabled={isDisabled}
								onChange={handleChange}
								className='form-select form-select-solid form-select-lg fw-semibold'
							>
								<option value=''>Select your grade for Mathematics</option>
								<option value='A'>A</option>
								<option value='B'>B</option>
								<option value='C'>C</option>
								<option value='D'>D</option>
								<option value='E'>E</option>
								<option value='F'>F</option>
								<option value='G'>G</option>
							</select>
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

export default Student
