import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaUserSecret } from 'react-icons/fa'
import { AuthContext } from '../context/authContext'

const SuperAdmin = () => {
	const { currentAdmin } = useContext(AuthContext) // Assuming currentAdmin contains the admin data
	const location = useLocation()

	return (
		<>
			{/*begin:Menu item for "Super Admin"*/}
			{currentAdmin.type === 'Super Admin' && (
				<div
					className={
						location.pathname === '/manage-admins'
							? 'menu-item py-2 show here'
							: 'menu-item py-2'
					}
				>
					{/*begin:Menu link*/}
					<span className='menu-link menu-center'>
						<FaUserSecret className='fs-1' />
						<Link to='/manage-admins'>
							<span
								className={
									location.pathname === '/manage-admins'
										? 'fs-5 fw-bolder ps-1 py-1'
										: 'menu-section fs-5 fw-bolder ps-1 py-1'
								}
							>
								Manage Admins
							</span>
						</Link>
					</span>
					{/*end:Menu link*/}
				</div>
			)}
			{/*end:Menu item for "Super Admin"*/}
		</>
	)
}

export default SuperAdmin
