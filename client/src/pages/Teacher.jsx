import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../assets/dark-logo.png'
import Reg from '../assets/register.svg'

const Teacher = () => {
	const [inputs, setInputs] = useState({
		name: '',
		number: '',
		school: '',
		address: '',
		salary: '',
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

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!Object.values(inputs).every((value) => value)) {
			setError('Form cannot be empty')
			return
		}
		try {
			await axios.post('/auth/teacher-register', inputs)
			setSuccessMsg('Registration successful')
			setError('') // Clear error message
			setTimeout(() => {
				navigate('/')
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
				<h2 className='mb20'>Teacher Registration</h2>
				<div className='form-container mb20'>
					<form>
						<input
							type={'text'}
							name={'name'}
							onChange={handleChange}
							placeholder={'Enter full name'}
						/>
						<input
							type={'tel'}
							name={'number'}
							onChange={handleChange}
							placeholder={'Enter phone number'}
						/>
						<input
							type={'text'}
							name={'school'}
							onChange={handleChange}
							placeholder={'Enter your school name'}
						/>
						<textarea
							placeholder={'Enter address'}
							name={'address'}
							onChange={handleChange}
						/>
						<select name='salary' onChange={handleChange}>
							<option value=''>Select salary range</option>
							<option value='T20'>T20</option>
							<option value='M40'>M40</option>
							<option value='B40'>B40</option>
						</select>
						<input
							type={'email'}
							name={'email'}
							onChange={handleChange}
							placeholder={'Enter email'}
						/>
						<input
							type={'password'}
							name={'password'}
							onChange={handleChange}
							placeholder={'Enter password'}
						/>
						<button onClick={handleSubmit}>Register</button>
					</form>
				</div>
				{err && <p className='txt-danger'>{err}</p>}
				{successMsg && <p className='txt-success'>{successMsg}</p>}
				<div className='reg-foot'>
					<span>
						Not a teacher?{' '}
						<Link className='link' to='/role'>
							Change role here
						</Link>
					</span>
					<span>
						Already registered?{' '}
						<Link className='link' to='/'>
							Login here
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default Teacher
