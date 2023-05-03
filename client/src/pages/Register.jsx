import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../assets/dark-logo.png'
import Reg from '../assets/register.svg'

const Register = () => {
	const [inputs, setInputs] = useState({
		name: '',
		number: '',
		birthday: '',
		address: '',
		school: '',
		level: '',
		grade: '',
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
			await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, inputs)
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
				<h2 className='mb20'>Register</h2>
				<div className='form-container mb20'>
					<form>
						<input
							name={'name'}
							onChange={handleChange}
							type={'text'}
							placeholder={'Enter full name'}
						/>
						<input
							name={'number'}
							onChange={handleChange}
							type={'tel'}
							placeholder={'Enter phone number'}
						/>
						<input
							name={'birthday'}
							onChange={handleChange}
							type={'date'}
							placeholder={'Enter birthday'}
						/>
						<textarea
							name={'address'}
							onChange={handleChange}
							placeholder={'Enter address'}
						/>
						<input
							name={'school'}
							onChange={handleChange}
							type={'text'}
							placeholder={'Enter school name'}
						/>
						<select name='level' onChange={handleChange}>
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
						<select name='grade' onChange={handleChange}>
							<option value=''>Select your grade for Mathematics</option>
							<option value='A'>A</option>
							<option value='B'>B</option>
							<option value='C'>C</option>
							<option value='D'>D</option>
							<option value='E'>E</option>
							<option value='F'>F</option>
							<option value='G'>G</option>
						</select>
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
						<button onClick={handleSubmit}>Register</button>
					</form>
				</div>
				{err && <p className='txt-danger'>{err}</p>}
				{successMsg && <p className='txt-success'>{successMsg}</p>}
				<div className='reg-foot'>
					<span>
						Not a student?{' '}
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

export default Register
