import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Reg from '../assets/bg10-dark.jpeg'
import Test from '../assets/register.svg'
import Logo from '../assets/logo.png'

const AdminRegister = () => {
	const [inputs, setInputs] = useState({
		staff: '',
		name: '',
		email: '',
		password: '',
	})
	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const navigate = useNavigate()
	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!Object.values(inputs).every((value) => value)) {
			setError('Please enter all details in the form')
			return
		}
		try {
			await axios.post(
				`${process.env.REACT_APP_API_URL}/auth/admin-register`,
				inputs
			)
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
								<h2 className='text-gray-800 fs-2qx fw-bold'>
									Admin Registration
								</h2>
							</div>
							{/* <!--begin::Separator--> */}
							<div className='separator my-14'></div>
							{/* <!--end::Separator--> */}
							<div className='mh-300px scroll-y p-10 mb-10'>
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Enter your name</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'name'}
										onChange={handleChange}
										type={'text'}
										placeholder={'Full name'}
										required
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Enter your staff ID</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'staff'}
										onChange={handleChange}
										type={'text'}
										placeholder={'Staff ID'}
										required
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Enter your email</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'email'}
										onChange={handleChange}
										type={'email'}
										placeholder={'Enter email'}
										required
										pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Enter your password</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'password'}
										onChange={handleChange}
										type={'password'}
										placeholder={'Enter password'}
										required
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
							</div>
							{/* <!--begin::Submit button--> */}
							<div className='d-grid mb-10'>
								<button
									type='submit'
									className='btn btn-primary'
									onClick={handleSubmit}
								>
									Register
								</button>
							</div>
							{/* <!--end::Submit button--> */}
							{err && <p className='text-danger'>{err}</p>}
							{successMsg && <p className='text-success'>{successMsg}</p>}
							{/* <!--begin::Sign in--> */}
							<div className='text-gray-500 text-center fw-semibold fs-6'>
								Already registered?{' '}
								<Link className='link' to='/admin'>
									Login here
								</Link>
							</div>
							{/* <!--end::Sign in--> */}
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

export default AdminRegister
