import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Reg from '../assets/bg10-dark.jpeg'
import Test from '../assets/register.svg'
import Logo from '../assets/logo.png'

const Register = () => {
	const [inputs, setInputs] = useState({
		name: '',
		number: '',
		parName: '',
		parNum: '',
		birthday: '',
		address: '',
		school: '',
		level: '',
		grade: '',
		email: '',
		confirm: '',
		password: '',
		confirmPassword: '',
	})
	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const navigate = useNavigate()
	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleEmail = (e) => {
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

	const handlePassword = (e) => {
		const { name, value } = e.target
		setInputs((prevInputs) => {
			const updatedPassInputs = { ...prevInputs, [name]: value }
			const { password, confirmPassword } = updatedPassInputs

			if (name === 'password' || name === 'confirmPassword') {
				if (password && confirmPassword && password !== confirmPassword) {
					setError('Both passwords must be the same')
				} else {
					setError('')
				}
			}

			return updatedPassInputs
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
		if (!/^(?!0123456789)\d{10,11}$/.test(inputs.number)) {
			setError('Invalid phone number')
			return
		}
		if (!/^(?!0123456789)\d{10,11}$/.test(inputs.parNum)) {
			setError('Invalid parent number')
			return
		}
		if (inputs.email !== inputs.confirm) {
			setError('Both emails must be the same')
			return
		}
		if (inputs.password !== inputs.confirmPassword) {
			setError('Both passwords must be the same')
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

	const getMaxDate = () => {
		const currentDate = new Date()
		const minDate = new Date(
			currentDate.getFullYear() - 7,
			currentDate.getMonth(),
			currentDate.getDate()
		)
		const formattedDate = `${minDate.getFullYear()}-${String(
			minDate.getMonth() + 1
		).padStart(2, '0')}-${String(minDate.getDate()).padStart(2, '0')}`

		return formattedDate
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
									Student Registration
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
										<span>Enter your number</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'number'}
										onChange={handleChange}
										type={'tel'}
										placeholder={'Ex: 0123456789'}
										required
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Enter your parent name</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'parName'}
										onChange={handleChange}
										type={'text'}
										placeholder={'Parent name'}
										required
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Enter your parent number</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'parNum'}
										onChange={handleChange}
										type={'tel'}
										placeholder={'Ex: 0123456789'}
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Enter your birthday</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'birthday'}
										onChange={handleChange}
										type={'date'}
										max={getMaxDate()}
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/*begin::Input group*/}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/*begin::Label*/}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										Enter Address
									</label>
									{/*end::Label*/}
									<textarea
										name={'address'}
										onChange={handleChange}
										placeholder={
											'Ex: No. 121, Taman Yayasan, Jalan Utara Baru, 40150 Shah Alam, Selangor'
										}
										required
										className='form-control bg-transparent'
										rows='3'
									/>
								</div>
								{/*end::Input group*/}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Enter your school name</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'school'}
										onChange={handleChange}
										type={'text'}
										placeholder={'School name'}
										required
										className='form-control bg-transparent'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/*begin::Input group*/}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/*begin::Label*/}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										Education Level
									</label>
									{/*end::Label*/}
									<select
										name='level'
										onChange={handleChange}
										required
										className='form-select bg-transparent'
									>
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
								</div>
								{/*end::Input group*/}
								{/*begin::Input group*/}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/*begin::Label*/}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										Grade
									</label>
									{/*end::Label*/}
									<select
										name='grade'
										onChange={handleChange}
										required
										className='form-select bg-transparent'
									>
										<option value=''>Select your grade for Mathematics</option>
										<option value='A'>A</option>
										<option value='B'>B</option>
										<option value='C'>C</option>
										<option value='D'>D</option>
										<option value='E'>E</option>
										<option value='F'>F</option>
										<option value='G'>G</option>
									</select>
								</div>
								{/*end::Input group*/}
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
										onCopy={handleCopy}
										onCut={handleCut}
										onPaste={handlePaste}
										autoComplete='off'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Retype your email to confirm</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name='confirm'
										onChange={handleEmail}
										type={'email'}
										placeholder={'Retype email'}
										required
										pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
										className='form-control bg-transparent'
										onCopy={handleCopy}
										onCut={handleCut}
										onPaste={handlePaste}
										autoComplete='off'
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column mb-5 fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Enter your password</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'password'}
										onChange={handlePassword}
										type={'password'}
										placeholder={'Enter password'}
										required
										className='form-control bg-transparent'
										onCopy={handleCopy}
										onCut={handleCut}
										onPaste={handlePaste}
									/>
								</div>
								{/* <!--end::Input group=--> */}
								{/* <!--begin::Input group=--> */}
								<div className='d-flex flex-column fv-row'>
									{/* <!--begin::Label--> */}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										<span>Retype your password to confirm</span>
									</label>
									{/* <!--end::Label--> */}
									<input
										name={'confirmPassword'}
										onChange={handlePassword}
										type={'password'}
										placeholder={'Retype password'}
										required
										className='form-control bg-transparent'
										onCopy={handleCopy}
										onCut={handleCut}
										onPaste={handlePaste}
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
							{err && <p className='text-center text-danger'>{err}</p>}
							{successMsg && (
								<p className='text-center text-success'>{successMsg}</p>
							)}
							{/* <!--begin::Sign in--> */}
							<div className='text-gray-500 text-center fw-semibold fs-6 mb-3'>
								Not a student?{' '}
								<Link className='link' to='/role'>
									Change role here
								</Link>
							</div>
							<div className='text-gray-500 text-center fw-semibold fs-6'>
								Already registered?{' '}
								<Link className='link' to='/'>
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

export default Register
