import React, { useContext, useState } from 'react'
import Logo from '../assets/dark-logo.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { FaTimes, FaBars, FaUserCog } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import { IoIosAlbums } from 'react-icons/io'
import ShortcutModal from './ShortcutModal'
import { MdAddToHomeScreen } from 'react-icons/md'

const Navbar = () => {
	const navigate = useNavigate()
	const { logout, currentUser } = useContext(AuthContext)

	const userId =
		currentUser?.studentEmail ||
		currentUser?.parentEmail ||
		currentUser?.teacherEmail

	const handleLogout = async () => {
		await logout()
		navigate('/')
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

	const [showModal, setShowModal] = useState(false)

	const handleAddToHomeScreen = () => {
		const isIos = () => {
			const userAgent = window.navigator.userAgent.toLowerCase()
			return /iphone|ipad|ipod/.test(userAgent)
		}
		const isInStandaloneMode = () =>
			'standalone' in window.navigator && window.navigator.standalone

		if (isIos() && !isInStandaloneMode()) {
			setShowModal(true)
		}
	}

	const handleConfirm = () => {
		setShowModal(false)
		window.location.href = '../../public/manifest.json'
	}

	const handleCancel = () => {
		setShowModal(false)
	}

	const location = useLocation()

	return (
		<div className='navbar'>
			<div className='container'>
				<div className='logo'>
					<Link to='/dashboard'>
						<img src={Logo} alt='Aster Education' />
					</Link>
				</div>
				<div className='toggler'>
					<span onClick={handleClick}>
						{isClicked ? <FaTimes /> : <FaBars />}
					</span>
				</div>
				<div className='links'>
					<Link
						onMouseEnter={() => handleMouseEnter('profile')}
						onMouseLeave={handleMouseLeave}
						to={`/profile/${userId}`}
						className={
							location.pathname === '/profile' ? 'nav-link active' : 'nav-link'
						}
					>
						<span>
							<FaUserCog />
						</span>
						{activeLink === 'profile' && (
							<div className='popover-content'>
								<p>Profile</p>
							</div>
						)}
					</Link>
					<Link
						onMouseEnter={() => handleMouseEnter('logout')}
						onMouseLeave={handleMouseLeave}
						onClick={handleLogout}
						className={location.pathname === '/logout' ? '' : 'nav-link'}
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
				{/*for small screens*/}
				<div className={isClicked ? 'small-links active' : 'small-links'}>
					<Link
						className='nav-link mr20 pointer'
						onClick={handleAddToHomeScreen}
					>
						<span>
							<MdAddToHomeScreen className='mr20' /> Add to Homescreen
						</span>
					</Link>
					{showModal && (
						<ShortcutModal
							title='Add to Home Screen'
							message='Do you want to add this app to your home screen?'
							onConfirm={handleConfirm}
							onCancel={handleCancel}
						/>
					)}
					<Link
						to={`/profile/${userId}`}
						className={
							location.pathname === '/profile' ? 'nav-link active' : 'nav-link'
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

export default Navbar
