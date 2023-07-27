import React, { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Reg from '../assets/bg10-dark.jpeg'
import Test from '../assets/register.svg'
import Logo from '../assets/logo.png'

const AdminLogin = () => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	})
	const [err, setError] = useState(null)

	const navigate = useNavigate()

	const { admin } = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		if (!inputs.email || !inputs.password) {
			setError('Please enter both email and password')
			return
		}
		try {
			await admin(inputs)
			setTimeout(() => {
				navigate('/admin-dashboard')
				setIsLoading(false)
			}, 3000)
		} catch (err) {
			setError(err.response.data)
			setIsLoading(false)
		}
	}

	return (
		<div className='d-flex flex-column flex-lg-row flex-column-fluid'>
			<div
				className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center'
				style={{ backgroundImage: `url(${Reg})` }}
			>
				<div className='d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100'>
					<a href='https://lms.aster.edu.my/' className='mb-0 mb-lg-12'>
						<img alt='Logo' src={Logo} className='h-80px h-lg-100px' />
					</a>
					<img
						className='d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
						src={Test}
						alt='Aster Education'
					/>
					<h2 className='d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7'>
						Learning Made Simple
					</h2>
					<p className='d-none d-lg-block text-white fs-base text-center'>
						Your one-stop destination for easy, convenient, and effective
						learning. Achieve your goals with our user-friendly LMS designed for
						students, employees, and lifelong learners.
					</p>
				</div>
			</div>
			<div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10'>
				<div className='d-flex flex-center flex-column flex-lg-row-fluid'>
					<div className='w-lg-500px p-10'>
						<form className='form w-100' onSubmit={handleSubmit}>
							<div className='text-center'>
								<h2 className='text-gray-800 fs-2qx fw-bold'>Admin Login</h2>
							</div>
							{/* <!--begin::Separator--> */}
							<div className='separator my-14'></div>
							{/* <!--begin::Input group=--> */}
							<div className='d-flex flex-column mb-10 fv-row'>
								{/* <!--begin::Label--> */}
								<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
									<span>Enter your email</span>
								</label>
								{/* <!--end::Label--> */}
								<input
									required
									type='email'
									placeholder='Ex: johndoe@gmail.com'
									name='email'
									onChange={handleChange}
									className='form-control bg-transparent'
								/>
							</div>
							{/* <!--end::Input group=--> */}
							{/* <!--begin::Input group=--> */}
							<div className='d-flex flex-column mb-3 fv-row'>
								{/* <!--begin::Label--> */}
								<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
									<span>Enter your password</span>
								</label>
								{/* <!--end::Label--> */}
								<input
									required
									type='password'
									placeholder='Enter password'
									name='password'
									onChange={handleChange}
									autoComplete='off'
									className='form-control bg-transparent'
								/>
							</div>
							{/* <!--end::Input group=--> */}
							{/* <!--begin::Wrapper--> */}
							<div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-10'>
								<div></div>
								{/* <!--begin::Link--> */}
								<Link className='link-primary' to='/reset-password'>
									Forgot password?
								</Link>
								{/* <!--end::Link--> */}
							</div>
							{/* <!--end::Wrapper--> */}
							{/* <!--begin::Submit button--> */}
							<div className='d-grid mb-10'>
								<button
									type='submit'
									className='btn btn-primary'
									onClick={handleSubmit}
									disabled={isLoading}
								>
									{isLoading ? 'Loading...' : 'Login'}
								</button>
							</div>
							{/* <!--end::Submit button--> */}
							{err && <p className='text-center text-danger'>{err}</p>}
							{/* <!--begin::Sign up--> */}
							<div className='text-gray-500 text-center fw-semibold fs-6'>
								No account yet?{' '}
								<Link className='link-primary' to='/admin-register'>
									Register here
								</Link>
							</div>
							{/* <!--end::Sign up--> */}
						</form>
					</div>
					<div className='w-lg-500px d-flex flex-stack px-10 mx-auto'>
						<p className='text-gray-500 text-center fw-semibold fs-6'>
							By signing in and signing up, you already agreed to our terms and
							conditions.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminLogin
