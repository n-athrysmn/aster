import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../assets/dark-logo.png'
import Reg from '../assets/register.svg'

const AdminRegister = () => {
	const [inputs, setInputs] = useState({
		staff: '',
		name: '',
		pfp: '',
		email: '',
		password: '',
	})
	const [err, setError] = useState(null)
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
		try {
			await axios.post('auth/admin-register', inputs)
			navigate('/admin')
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
				<h1>Admin Register</h1>
				<div className='form-container'>
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
							type={'file'}
							id={'file'}
							style={{ display: 'none' }}
							onChange={(event) => {
								handleFileSelect(event)
								handleChange(event)
							}}
							name={'pfp'}
						/>
						<label htmlFor='file'>{fileName}</label>
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
						{err && <p>{err}</p>}
					</form>
				</div>
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
