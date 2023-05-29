import React from 'react'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
			{/*begin::Container*/}
			<div className='container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between'>
				{/*begin::Copyright*/}
				<div className='text-dark order-2 order-md-1'>
					<span className='text-muted fw-semibold me-1'>
						{currentYear} &copy;
					</span>
					<a
						href='https://lms.aster.edu.my'
						target='_blank'
						className='text-gray-800 text-hover-primary'
						rel='noreferrer'
					>
						Aster Edu Learning Management System
					</a>
				</div>
				{/*end::Copyright*/}
				{/*begin::Menu*/}
				<ul className='menu menu-gray-600 menu-hover-primary fw-semibold order-1'>
					<li className='menu-item'>
						<a
							href='https://aster.edu.my/about-us/'
							target='_blank'
							className='menu-link px-2'
							rel='noreferrer'
						>
							About
						</a>
					</li>
					<li className='menu-item'>
						<a
							href='https://wa.me/60192549717'
							target='_blank'
							className='menu-link px-2'
							rel='noreferrer'
						>
							Support
						</a>
					</li>
				</ul>
				{/*end::Menu*/}
			</div>
			{/*end::Container*/}
		</div>
	)
}

export default Footer
