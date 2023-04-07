import React, { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Logo from '../assets/dark-logo.png'
import Reg from '../assets/register.svg'

const AdminLogin = () => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	})
	const [err, setError] = useState(null)

	const navigate = useNavigate()

	const { admin } = useContext(AuthContext)

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!inputs.email || !inputs.password) {
			setError('Please enter both email and password')
			return
		}
		try {
			await admin(inputs)
			navigate('/admin-dashboard')
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
				<h2 className='mb20'>Admin Login</h2>
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
						placeholder='Enter password'
						name='password'
						onChange={handleChange}
					/>
					<button onClick={handleSubmit}>Login</button>
					{err && <p>{err}</p>}
				</form>
				<div className='reg-foot'>
					<span>
						No account yet?{' '}
						<Link className='link' to='/admin-register'>
							Register here
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default AdminLogin
