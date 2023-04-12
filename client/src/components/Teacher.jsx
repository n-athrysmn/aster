import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import {
	FaEnvelope,
	FaHome,
	FaMoneyCheckAlt,
	FaPhoneAlt,
	FaSchool,
	FaUser,
} from 'react-icons/fa'

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
	})

	useEffect(() => {
		const fetchTeacher = async () => {
			try {
				console.log('Fetching teacher…')
				const res = await axios.get(`/users/getTeacher/${email}`)
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
		try {
			await axios.put(`/users/teacher-edit/${email}`, teacher)
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
		<div className='profile-card'>
			<div className='info'>
				<form className='form-profile'>
					<div className='form-row'>
						<div className='form-label'>Name</div>
						<div className='input-group input-group-icon'>
							<input
								type={'text'}
								value={teacher.teacherName}
								name='teacherName'
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
								value={teacher.teacherEmail}
								name='teacherEmail'
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
								value={teacher.teacherNumber}
								name='teacherNumber'
								disabled={isDisabled}
								onChange={handleChange}
							/>
							<div className='input-icon'>
								<FaPhoneAlt />
							</div>
						</div>
					</div>
					<div className='form-row'>
						<div className='form-label'>Address</div>
						<div className='input-group input-group-icon'>
							<textarea
								name='teacherAddr'
								value={teacher.teacherAddr}
								disabled={isDisabled}
								onChange={handleChange}
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
								name='teacherSch'
								value={teacher.teacherSch}
								onChange={handleChange}
								disabled={isDisabled}
							/>
							<div className='input-icon'>
								<FaSchool />
							</div>
						</div>
					</div>
					<div className='form-row'>
						<div className='form-label'>Salary range</div>
						<div className='input-group input-group-icon'>
							<select
								name='teacherSalary'
								value={teacher.teacherSalary}
								disabled={isDisabled}
								onChange={handleChange}
							>
								<option value=''>Select salary range</option>
								<option value='T20'>T20</option>
								<option value='M40'>M40</option>
								<option value='B40'>B40</option>
							</select>
							<div className='input-icon'>
								<FaMoneyCheckAlt />
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
						<button
							onClick={handleCancelClick}
							className='btn btn-sm btn-danger'
						>
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
	)
}

export default Teacher
