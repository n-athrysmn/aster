import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../assets/dark-logo.png'
import Reg from '../assets/register.svg'

const AdminRegister = () => {
	const [inputs, setInputs] = useState({
		staff: '',
		name: '',
		email: '',
		password: '',
	})
	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	console.log(inputs)

	const navigate = useNavigate()
	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const [fileName, setFileName] = useState('Upload profile picture')

	const handleFileSelect = (e) => {
		const selectedFile = e.target.files[0]
		if (selectedFile) {
			setFileName(selectedFile.name)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!Object.values(inputs).every((value) => value)) {
			setError('Form cannot be empty')
			return
		}
		try {
			await axios.post('auth/admin-register', inputs)
			setSuccessMsg('Registration successful')
			setError('') // Clear error message
			setTimeout(() => {
				navigate('/admin')
				setSuccessMsg('') // Clear success message
			}, 3000)
		} catch (err) {
			setError(err.response.data)
		}
	}

	return (
		<div className='auth'>
			<div className='top-left'>
				<img className='logo' src={Logo} alt='Aster Education' />
				<img className='media' src={Reg} alt='Aster Education' />
				<h2 className='reg-text'>Learning Made Simple</h2>
				<p className='reg-text'>
					Your one-stop destination for easy, convenient, and effective
					learning. Achieve your goals with our user-friendly LMS designed for
					students, employees, and lifelong learners.
				</p>
			</div>
			<div className='auth-form'>
				<h2 className='mb20'>Admin Register</h2>
				<div className='form-container mb20'>
					<form>
						<input
							name={'name'}
							onChange={handleChange}
							type={'text'}
							placeholder={'Enter full name'}
						/>
						<input
							name={'staff'}
							onChange={handleChange}
							type={'text'}
							placeholder={'Enter staff ID'}
						/>
						<input
							name={'email'}
							onChange={handleChange}
							type={'email'}
							placeholder={'Enter email'}
						/>
						<input
							name={'password'}
							onChange={handleChange}
							type={'password'}
							placeholder={'Enter password'}
						/>
						<button onClick={handleSubmit}>Admin Register</button>
					</form>
				</div>
				{err && <p className='txt-danger'>{err}</p>}
				{successMsg && <p className='txt-success'>{successMsg}</p>}
				<div className='reg-foot'>
					<span>
						Already registered?{' '}
						<Link className='link' to='/admin'>
							Login here
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default AdminRegister
