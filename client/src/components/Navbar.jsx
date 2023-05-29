import React, { useContext } from 'react'
import LogoDark from '../assets/dark-logo.png'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { MdLogout } from 'react-icons/md'

const Navbar = ({ toggleAside }) => {
	const navigate = useNavigate()
	const { logout } = useContext(AuthContext)

	const handleLogout = async () => {
		await logout()
		navigate('/')
	}

	return (
		<div id='kt_header' className='header align-items-stretch'>
			{/*begin::Container*/}
			<div className='container-fluid d-flex align-items-stretch justify-content-between'>
				{/*begin::Aside mobile toggle*/}
				<div
					className='d-flex align-items-center d-lg-none ms-n1 me-2'
					title='Show aside menu'
				>
					<div
						className='btn btn-icon btn-active-color-primary w-30px h-30px w-md-40px h-md-40px'
						id='kt_aside_mobile_toggle'
						onClick={toggleAside}
					>
						{/*begin::Svg Icon | path: icons/duotune/abstract/abs015.svg*/}
						<span className='svg-icon svg-icon-1'>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z'
									fill='currentColor'
								/>
								<path
									opacity='0.3'
									d='M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z'
									fill='currentColor'
								/>
							</svg>
						</span>
						{/*end::Svg Icon*/}
					</div>
				</div>
				{/*end::Aside mobile toggle*/}
				{/*begin::Mobile logo*/}
				<div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
					<a href='/dashboard' className='d-lg-none'>
						<img src={LogoDark} alt='Aster Education' className='h-50px logo' />
					</a>
				</div>
				{/*end::Mobile logo*/}
				{/*begin::Wrapper*/}
				<div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
					{/*begin::Navbar*/}
					<div className='d-flex align-items-stretch' id='kt_header_nav'>
						{/*begin::Menu wrapper*/}
						<div
							className='header-menu align-items-stretch'
							data-kt-drawer='true'
							data-kt-drawer-name='header-menu'
							data-kt-drawer-activate='{default: true, lg: false}'
							data-kt-drawer-overlay='true'
							data-kt-drawer-width="{default:'200px', '300px': '250px'}"
							data-kt-drawer-direction='end'
							data-kt-drawer-toggle='#kt_header_menu_mobile_toggle'
							data-kt-swapper='true'
							data-kt-swapper-mode='prepend'
							data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
						></div>
						{/*end::Menu wrapper*/}
					</div>
					{/*end::Navbar*/}
					{/*begin::Toolbar wrapper*/}
					<div className='d-flex align-items-stretch flex-shrink-0'>
						{/*begin::Logout*/}
						<div className='d-flex align-items-center ms-1 ms-lg-3'>
							{/*begin::Button*/}
							<button
								onClick={handleLogout}
								className='fs-2 fw-bolder btn btn-icon btn-color-muted btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
							>
								<MdLogout />
							</button>
							{/*begin::Button*/}
						</div>
						{/*end::Logout*/}
					</div>
					{/*end::Toolbar wrapper*/}
				</div>
				{/*end::Wrapper*/}
			</div>
			{/*end::Container*/}
		</div>
	)
}

export default Navbar
