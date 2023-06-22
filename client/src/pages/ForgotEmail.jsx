import React, { useState } from 'react'
import Reg from '../assets/bg10-dark.jpeg'
import Test from '../assets/register.svg'
import Logo from '../assets/logo.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const ForgotEmail = () => {
	const [inputs, setInputs] = useState({
		email: '',
		confirm: '',
		number: '',
	})
	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const handleChange = (e) => {
		const { name, value } = e.target
		setInputs((prevInputs) => {
			const updatedInputs = { ...prevInputs, [name]: value }
			const { email, confirm } = updatedInputs

			if (name === 'email' || name === 'confirm') {
				if (email && confirm && email !== confirm) {
					setError('Both emails must be the same')
				} else {
					setError('')
				}
			}

			return updatedInputs
		})
	}

	const handleCopy = (event) => {
		event.preventDefault()
	}

	const handleCut = (event) => {
		event.preventDefault()
	}

	const handlePaste = (event) => {
		event.preventDefault()
	}

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!Object.values(inputs).every((value) => value)) {
			setError('Please enter all details in the form')
			return
		}
		if (
			!inputs.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
		) {
			setError('Please enter a valid email address')
			return
		}
		if (inputs.email !== inputs.confirm) {
			setError('Both emails must be the same')
			return
		}
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/auth/forgot/${inputs.number}`,
				inputs
			)
			setSuccessMsg('Email reset successful, please login using your new email')
			setError('') // Clear error message
			setTimeout(() => {
				setSuccessMsg('') // Clear success message
				navigate('/')
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
								<h2 className='text-gray-800 fs-2qx fw-bold'>Reset Email</h2>
							</div>
							{/* <!--begin::Separator--> */}
							<div className='separator my-14'></div>
							{/* <!--end::Separator--> */}
							{/* <!--begin::Input group=--> */}
							<div className='d-flex flex-column mb-10 fv-row'>
								{/* <!--begin::Label--> */}
								<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
									<span>Enter your phone number that you used to register</span>
								</label>
								{/* <!--end::Label--> */}
								<input
									required
									type='tel'
									placeholder='Enter phone number'
									name='number'
									onChange={handleChange}
									autoComplete='off'
									className='form-control bg-transparent'
								/>
							</div>
							{/* <!--end::Input group=--> */}
							{/* <!--begin::Input group=--> */}
							<div className='d-flex flex-column mb-10 fv-row'>
								{/* <!--begin::Label--> */}
								<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
									<span>Enter new email</span>
								</label>
								{/* <!--end::Label--> */}
								<input
									required
									type='email'
									placeholder='New email'
									name='email'
									onChange={handleChange}
									autoComplete='off'
									className='form-control bg-transparent'
									pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
									onCopy={handleCopy}
									onCut={handleCut}
									onPaste={handlePaste}
								/>
							</div>
							{/* <!--end::Input group=--> */}
							{/* <!--begin::Input group=--> */}
							<div className='d-flex flex-column mb-10 fv-row'>
								{/* <!--begin::Label--> */}
								<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
									<span>Retype to confirm your new email</span>
								</label>
								{/* <!--end::Label--> */}
								<input
									required
									type='email'
									name='confirm'
									placeholder='Confirm new email'
									onChange={handleChange}
									autoComplete='off'
									className='form-control bg-transparent'
									pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
									onCopy={handleCopy}
									onCut={handleCut}
									onPaste={handlePaste}
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
							By signing in and signing up, you already agreed to our terms and
							conditions.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgotEmail
