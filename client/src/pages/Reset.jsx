import React, { useState } from 'react'
import Reg from '../assets/register.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
		<div className='d-flex flex-column flex-lg-row flex-column-fluid'>
			<div className='d-flex flex-lg-row-fluid'>
				<div className='d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100'>
					{/* <img
						className='theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20'
						src={Logo}
						alt='Aster Education'
					/> */}
					<img
						className='theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20'
						src={Reg}
						alt='Aster Education'
					/>
					<h2 className='text-gray-800 fs-2qx fw-bold text-center mb-7'>
						Learning Made Simple
					</h2>
					<p className='text-gray-600 fs-base text-center fw-semibold'>
						Your one-stop destination for easy, convenient, and effective
						learning. Achieve your goals with our user-friendly LMS designed for
						students, employees, and lifelong learners.
					</p>
				</div>
			</div>
			<div className='d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12'>
				<div className='bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-10'>
					<div className='d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px'>
						<div className='d-flex flex-center flex-column-fluid pb-15 pb-lg-20'>
							<form className='form w-100' onSubmit={handleSubmit}>
								<div className='text-center'>
									<h2 className='text-gray-800 fs-2qx fw-bold'>
										Reset Password
									</h2>
								</div>
								{/* <!--begin::Separator--> */}
								<div className='separator my-14'></div>
								{/* <!--end::Separator--> */}
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
										placeholder='Enter email'
										name='email'
										onChange={handleChange}
										autocomplete='off'
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column mb-10 fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Enter new password</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										required
										type='password'
										placeholder='Enter new password'
										name='password'
										onChange={handleChange}
										autocomplete='off'
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Submit button--> */}
								<div className='d-grid mb-10'>
									<button
										type='submit'
										className='btn btn-primary'
										onClick={handleSubmit}
									>
										Reset
									</button>
								</div>
								{/* <!--end::Submit button--> */}
								{err && <p className='text-center text-danger'>{err}</p>}
								{successMsg && (
									<p className='text-center text-success'>{successMsg}</p>
								)}
								{/* <!--begin::Sign up--> */}
								<div className='text-gray-500 text-center fw-semibold fs-6'>
									<Link className='link-primary' to='/'>
										Click here to login
									</Link>
								</div>
								{/* <!--end::Sign up--> */}
							</form>
						</div>
						<div className='d-flex flex-stack'>
							<p className='text-gray-500 text-center fw-semibold fs-6'>
								By signing in and signing up, you already agreed to our terms
								and conditions.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResetPassword
