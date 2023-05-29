import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Logo from '../assets/logo.png'
import { MdHome } from 'react-icons/md'
import { FaUserCog } from 'react-icons/fa'

const Aside = ({ isAsideVisible }) => {
	const { currentUser } = useContext(AuthContext)

	const email =
		currentUser?.studentEmail ||
		currentUser?.parentEmail ||
		currentUser?.teacherEmail

	const location = useLocation()
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		// Function to check if the viewport is in mobile view
		const checkIsMobile = () => {
			const isMobileView = window.innerWidth <= 966 // Adjust the breakpoint as needed
			setIsMobile(isMobileView)
		}

		// Add event listener to check on window resize
		window.addEventListener('resize', checkIsMobile)

		// Initial check when component mounts
		checkIsMobile()

		// Clean up event listener when component unmounts
		return () => {
			window.removeEventListener('resize', checkIsMobile)
		}
	}, [])
	const asideClassName = isAsideVisible ? 'drawer-on' : ''

	return (
		<div
			className={`aside overflow-visible pb-5 pt-5 pt-lg-0 ${
				isMobile ? 'drawer drawer-start w-100px' : ''
			} ${asideClassName}`}
		>
			{/*begin::Brand*/}
			<div className='aside-logo py-8' id='kt_aside_logo'>
				{/*begin::Logo*/}
				<a href='/dashboard' className='d-flex align-items-center'>
					<img src={Logo} alt='Aster Education' className='h-100px logo' />
				</a>
				{/*end::Logo*/}
			</div>
			{/*end::Brand*/}
			{/*begin::Aside menu*/}
			<div className='aside-menu flex-column-fluid' id='kt_aside_menu'>
				{/*begin::Aside Menu*/}
				<div className='hover-scroll-overlay-y my-2 my-lg-5 pe-lg-n1'>
					{/*begin::Menu*/}
					<div
						className={
							location.pathname === '/dashboard'
								? 'menu menu-column menu-title-primary fw-semibold'
								: 'menu menu-column menu-title-gray fw-semibold'
						}
						id='#kt_aside_menu'
						data-kt-menu='true'
					>
						{/*begin:Menu item*/}
						<div
							className={
								location.pathname === '/dashboard'
									? 'menu-item py-2 show here'
									: 'menu-item py-2'
							}
						>
							{/*begin:Menu link*/}
							<span className='menu-link menu-center'>
								<MdHome className='fs-1' />
								<Link to='/dashboard'>
									<span
										className={
											location.pathname === `/dashboard`
												? 'fs-5 fw-bolder ps-1 py-1'
												: 'menu-section fs-5 fw-bolder ps-1 py-1'
										}
									>
										Home
									</span>
								</Link>
							</span>
							{/*end:Menu link*/}
						</div>
						{/*end:Menu item*/}
						{/*begin:Menu item*/}
						<div
							className={
								location.pathname === `/profile/${email}`
									? 'menu-item py-2 show here'
									: 'menu-item py-2'
							}
						>
							{/*begin:Menu link*/}
							<span className='menu-link menu-center'>
								<FaUserCog className='fs-1' />
								<Link to={`/profile/${email}`}>
									<span
										className={
											location.pathname === `/profile/${email}`
												? 'fs-5 fw-bolder ps-1 py-1'
												: 'menu-section fs-5 fw-bolder ps-1 py-1'
										}
									>
										Profile
									</span>
								</Link>
							</span>
							{/*end:Menu link*/}
						</div>
						{/*end:Menu item*/}
					</div>
					{/*end::Menu*/}
				</div>
				{/*end::Aside Menu*/}
			</div>
			{/*end::Aside menu*/}
		</div>
	)
}

export default Aside
