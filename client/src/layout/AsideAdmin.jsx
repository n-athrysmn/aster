import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/logo.png'
import {
	MdEditCalendar,
	MdHome,
	MdLibraryBooks,
	MdVideoSettings,
} from 'react-icons/md'
import { FaBullhorn, FaUserCog, FaUsers } from 'react-icons/fa'

const AsideAdmin = ({ isAsideVisible }) => {
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
			className={`aside overflow-visible pb-5 pt-5 pt-lg-0 text-center ${
				isMobile ? 'drawer drawer-start w-150px' : ''
			} ${asideClassName}`}
		>
			{/*begin::Brand*/}
			<div className='aside-logo py-8' id='kt_aside_logo'>
				{/*begin::Logo*/}
				<a href='/admin-dashboard' className='d-flex align-items-center'>
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
							location.pathname === '/admin-dashboard'
								? 'menu menu-column menu-title-primary fw-semibold'
								: 'menu menu-column menu-title-gray fw-semibold'
						}
						id='#kt_aside_menu'
						data-kt-menu='true'
					>
						{/*begin:Menu item*/}
						<div
							className={
								location.pathname === '/admin-dashboard'
									? 'menu-item py-2 show here'
									: 'menu-item py-2'
							}
						>
							{/*begin:Menu link*/}
							<span className='menu-link menu-center'>
								<MdHome className='fs-1' />
								<Link to='/admin-dashboard'>
									<span
										className={
											location.pathname === `/admin-dashboard`
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
								location.pathname === '/manage-event'
									? 'menu-item py-2 show here'
									: 'menu-item py-2'
							}
						>
							{/*begin:Menu link*/}
							<span className='menu-link menu-center'>
								<MdEditCalendar className='fs-1' />
								<Link to='/manage-event'>
									<span
										className={
											location.pathname === `/manage-event`
												? 'fs-5 fw-bolder ps-1 py-1'
												: 'menu-section fs-5 fw-bolder ps-1 py-1'
										}
									>
										Manage Events
									</span>
								</Link>
							</span>
							{/*end:Menu link*/}
						</div>
						{/*end:Menu item*/}
						{/*begin:Menu item*/}
						<div
							className={
								location.pathname === '/manage-book'
									? 'menu-item py-2 show here'
									: 'menu-item py-2'
							}
						>
							{/*begin:Menu link*/}
							<span className='menu-link menu-center'>
								<MdLibraryBooks className='fs-1' />
								<Link to='/manage-book'>
									<span
										className={
											location.pathname === `/manage-book`
												? 'fs-5 fw-bolder ps-1 py-1'
												: 'menu-section fs-5 fw-bolder ps-1 py-1'
										}
									>
										Manage Books
									</span>
								</Link>
							</span>
							{/*end:Menu link*/}
						</div>
						{/*end:Menu item*/}
						{/*begin:Menu item*/}
						<div
							className={
								location.pathname === '/videos'
									? 'menu-item py-2 show here'
									: 'menu-item py-2'
							}
						>
							{/*begin:Menu link*/}
							<span className='menu-link menu-center'>
								<MdVideoSettings className='fs-1' />
								<Link to='/videos'>
									<span
										className={
											location.pathname === `/videos`
												? 'fs-5 fw-bolder ps-1 py-1'
												: 'menu-section fs-5 fw-bolder ps-1 py-1'
										}
									>
										Manage Videos
									</span>
								</Link>
							</span>
							{/*end:Menu link*/}
						</div>
						{/*end:Menu item*/}
						{/*begin:Menu item*/}
						<div
							className={
								location.pathname === '/announcement'
									? 'menu-item py-2 show here'
									: 'menu-item py-2'
							}
						>
							{/*begin:Menu link*/}
							<span className='menu-link menu-center'>
								<FaBullhorn className='fs-1' />
								<Link to='/announcement'>
									<span
										className={
											location.pathname === `/announcement`
												? 'fs-5 fw-bolder ps-1 py-1'
												: 'menu-section fs-5 fw-bolder ps-1 py-1'
										}
									>
										Manage Announce
									</span>
								</Link>
							</span>
							{/*end:Menu link*/}
						</div>
						{/*end:Menu item*/}
						{/*begin:Menu item*/}
						<div
							className={
								location.pathname === '/user-list'
									? 'menu-item py-2 show here'
									: 'menu-item py-2'
							}
						>
							{/*begin:Menu link*/}
							<span className='menu-link menu-center'>
								<FaUsers className='fs-1' />
								<Link to='/user-list'>
									<span
										className={
											location.pathname === `/user-list`
												? 'fs-5 fw-bolder ps-1 py-1'
												: 'menu-section fs-5 fw-bolder ps-1 py-1'
										}
									>
										Users List
									</span>
								</Link>
							</span>
							{/*end:Menu link*/}
						</div>
						{/*end:Menu item*/}
						{/*begin:Menu item*/}
						<div
							className={
								location.pathname === `/admin-profile`
									? 'menu-item py-2 show here'
									: 'menu-item py-2'
							}
						>
							{/*begin:Menu link*/}
							<span className='menu-link menu-center'>
								<FaUserCog className='fs-1' />
								<Link to={`/admin-profile`}>
									<span
										className={
											location.pathname === `/admin-profile`
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

export default AsideAdmin
