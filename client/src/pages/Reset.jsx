import React, { useState } from 'react'
import Logo from '../assets/dark-logo.png'
import Reg from '../assets/register.svg'
import axios from 'axios'

const ResetPassword = () => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	})
	console.log('Inputs: ', inputs)
	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

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
			await axios.put(
				`${process.env.REACT_APP_API_URL}/auth/reset/${inputs.email}`,
				inputs
			)
			setSuccessMsg('Password reset successful')
			setError('') // Clear error message
			setTimeout(() => {
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
				<h2 className='mb20'>Reset Password</h2>
				<form className='form-container' onSubmit={handleSubmit}>
					<input
						required
						type='email'
						placeholder='Enter email'
						name='email'
						onChange={handleChange}
					/>
					<input
						required
						type='password'
						placeholder='Enter new password'
						name='password'
						onChange={handleChange}
					/>
					<button onClick={handleSubmit}>Reset</button>
					{err && <p>{err}</p>}
					{successMsg && <p className='txt-success'>{successMsg}</p>}
				</form>
			</div>
		</div>
	)
}

export default ResetPassword
