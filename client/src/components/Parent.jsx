import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaHome, FaPhoneAlt, FaUser } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const Parent = () => {
	const location = useLocation()
	const email = location.pathname.split('/')[2]
	const [parent, setParent] = useState({
		parentName: '',
		parentEmail: '',
		parentNumber: '',
		parentAddr: '',
		parentSch: '',
		parentLevel: '',
		parentGrade: '',
	})

	useEffect(() => {
		const fetchParent = async () => {
			try {
				console.log('Fetching parent…')
				const res = await axios.get(`/users/getParent/${email}`)
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
		try {
			await axios.put(`/users/parent-edit/${email}`, parent)
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
								value={parent.parentName}
								name='parentName'
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
								value={parent.parentEmail}
								name='parentEmail'
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
								value={parent.parentNumber}
								name='parentNumber'
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
								name='parentAddr'
								value={parent.parentAddr}
								disabled={isDisabled}
								onChange={handleChange}
							/>
							<div className='input-icon'>
								<FaHome />
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
						<button onClick={handleCancelClick} className='btn btn-danger'>
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

export default Parent
