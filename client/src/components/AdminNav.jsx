import React, { useContext, useState } from 'react'
import Logo from '../assets/dark-logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { FaTimes, FaBars, FaUserCog, FaUsers, FaBullhorn } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import { MdEditCalendar, MdLibraryBooks } from 'react-icons/md'

const AdminNav = () => {
	const navigate = useNavigate()
	const { logout } = useContext(AuthContext)

	const handleLogout = async () => {
		await logout()
		navigate('/admin')
	}

	const [isClicked, setIsClicked] = useState(false)

	const handleClick = () => {
		setIsClicked(!isClicked)
	}

	const [activeLink, setActiveLink] = useState(null)

	const handleMouseEnter = (link) => {
		setActiveLink(link)
	}

	const handleMouseLeave = () => {
		setActiveLink(null)
	}

	const location = useLocation()

	return (
		<div className='navbar'>
			<div className='container'>
				<div className='logo'>
					<Link to='/admin-dashboard'>
						<img src={Logo} alt='Aster Education' />
					</Link>
				</div>
				<div className='toggler'>
					<span onClick={handleClick}>
						{isClicked ? <FaTimes /> : <FaBars />}
					</span>
				</div>
				{/*for large screens nav*/}
				<div className='links'>
					<Link
						onMouseEnter={() => handleMouseEnter('manage-event')}
						onMouseLeave={handleMouseLeave}
						to='/manage-event'
						className={
							location.pathname === '/manage-event'
								? 'nav-link active'
								: 'nav-link'
						}
					>
						<span>
							<MdEditCalendar />
						</span>
						{activeLink === 'manage-event' && (
							<div className='popover-content'>
								<p>Event Management</p>
							</div>
						)}
					</Link>
					<Link
						onMouseEnter={() => handleMouseEnter('manage-book')}
						onMouseLeave={handleMouseLeave}
						to='/manage-book'
						className={
							location.pathname === '/manage-book'
								? 'nav-link active'
								: 'nav-link'
						}
					>
						<span>
							<MdLibraryBooks />
						</span>
						{activeLink === 'manage-book' && (
							<div className='popover-content'>
								<p>Books Management</p>
							</div>
						)}
					</Link>
					<Link
						onMouseEnter={() => handleMouseEnter('announcement')}
						onMouseLeave={handleMouseLeave}
						to='/announcement'
						className={
							location.pathname === '/announcement'
								? 'nav-link active'
								: 'nav-link'
						}
					>
						<span>
							<FaBullhorn />
						</span>
						{activeLink === 'announcement' && (
							<div className='popover-content'>
								<p>Announcement Management</p>
							</div>
						)}
					</Link>
					<Link
						onMouseEnter={() => handleMouseEnter('user-list')}
						onMouseLeave={handleMouseLeave}
						to='/user-list'
						className={
							location.pathname === '/user-list'
								? 'nav-link active'
								: 'nav-link'
						}
					>
						<span>
							<FaUsers />
						</span>
						{activeLink === 'user-list' && (
							<div className='popover-content'>
								<p>Users List</p>
							</div>
						)}
					</Link>
					<Link
						onMouseEnter={() => handleMouseEnter('admin-profile')}
						onMouseLeave={handleMouseLeave}
						to='/admin-profile'
						className={
							location.pathname === '/admin-profile'
								? 'nav-link active'
								: 'nav-link'
						}
					>
						<span>
							<FaUserCog />
						</span>
						{activeLink === 'admin-profile' && (
							<div className='popover-content'>
								<p>Profile</p>
							</div>
						)}
					</Link>
					<Link
						onMouseEnter={() => handleMouseEnter('logout')}
						onMouseLeave={handleMouseLeave}
						onClick={handleLogout}
						className='nav-link'
					>
						<span>
							<HiOutlineLogout />
						</span>
						{activeLink === 'logout' && (
							<div className='popover-content'>
								<p>Logout</p>
							</div>
						)}
					</Link>
				</div>
				{/*for small screens nav*/}
				<div className={isClicked ? 'small-links active' : 'small-links'}>
					<Link
						to='/manage-event'
						className={
							location.pathname === '/manage-event'
								? 'nav-link active'
								: 'nav-link'
						}
					>
						<span>
							<MdEditCalendar className='mr20' /> Event Management
						</span>
					</Link>
					<Link
						to='/manage-book'
						className={
							location.pathname === '/manage-book'
								? 'nav-link active'
								: 'nav-link'
						}
					>
						<span>
							<MdLibraryBooks className='mr20' /> Books Management
						</span>
					</Link>
					<Link
						to='/announcement'
						className={
							location.pathname === '/announcement'
								? 'nav-link active'
								: 'nav-link'
						}
					>
						<span>
							<FaBullhorn className='mr20' /> Announcement Management
						</span>
					</Link>
					<Link
						to='/user-list'
						className={
							location.pathname === '/user-list'
								? 'nav-link active'
								: 'nav-link'
						}
					>
						<span>
							<FaUsers className='mr20' /> Users List
						</span>
					</Link>
					<Link
						to='/admin-profile'
						className={
							location.pathname === '/admin-profile'
								? 'nav-link active'
								: 'nav-link'
						}
					>
						<span>
							<FaUserCog className='mr20' /> Profile
						</span>
					</Link>
					<Link onClick={handleLogout} className='nav-link'>
						<span>
							<HiOutlineLogout className='mr20' /> Logout
						</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default AdminNav
