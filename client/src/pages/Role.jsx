import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/dark-logo.png'
import { FaChalkboardTeacher, FaUser, FaUserGraduate } from 'react-icons/fa'

const Role = () => {
	return (
		<div className='d-flex flex-column flex-center flex-column-fluid'>
			<div className='d-flex flex-column flex-center text-center p-10'>
				{/*begin::Wrapper*/}
				<div class='card card-flush w-md-650px py-5'>
					<div class='card-body py-15 py-lg-20'>
						{/*begin::Logo*/}
						<div class='mb-7'>
							<a href='../../demo6/dist/index.html' class=''>
								<img alt='Logo' src={Logo} class='h-100px' />
							</a>
						</div>
						{/*end::Logo*/}
						{/*begin::Title*/}
						<h1 class='fw-bolder text-gray-900 mb-10'>Choose Your Role</h1>
						{/*end::Title*/}
						{/*begin::Link*/}
						<div className='row'>
							<div class='col-lg-4'>
								<a
									href='/register'
									class='btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-10 fs-5'
								>
									<FaUserGraduate className='me-10' /> Student
								</a>
							</div>
							<div class='col-lg-4'>
								<a
									href='/parent-register'
									class='btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-10 fs-5'
								>
									<FaUser className='me-10' /> Parent
								</a>
							</div>
							<div class='col-lg-4'>
								<a
									href='/teacher-register'
									class='btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-10 fs-5'
								>
									<FaChalkboardTeacher className='me-10' /> Teacher
								</a>
							</div>
						</div>
						{/*end::Link*/}
						<div className='text-gray-500 text-center fw-semibold fs-6 mb-10'>
							<Link className='link-primary' to='/'>
								Click here to login
							</Link>
						</div>
						<div className='d-flex flex-stack'>
							<p className='text-gray-500 text-center fw-semibold fs-6'>
								By signing in and signing up, you already agreed to our terms
								and conditions.
							</p>
						</div>
					</div>
				</div>
				{/*end::Wrapper*/}
			</div>
		</div>
	)
}

export default Role
