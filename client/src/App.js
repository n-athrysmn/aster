import './style.bundle.css'
import './style.scss'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Parent from './pages/Parent'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Books from './pages/Books'
import Role from './pages/Role'
import Teacher from './pages/Teacher'
import AdminLogin from './pages/Admin'
import AdminRegister from './pages/AdminRegister'
import AdminHome from './pages/AdminHome'
import AdminNav from './components/AdminNav'
import OneSignalComponent from './components/OneSignal'
import AdminProfile from './pages/AdminProfile'
import UsersList from './pages/UsersList'
import Event from './pages/Event'
import AdminBook from './pages/AdminBooks'
import Announce from './pages/Announce'
import BookDetails from './pages/BookDetails'
import ResetPassword from './pages/Reset'
import ResetEmail from './pages/EmailReset'
import Videos from './pages/Videos'
import UserEmail from './pages/UserEmail'
import Aside from './layout/Aside'
import { useEffect, useState } from 'react'
import AsideAdmin from './layout/AsideAdmin'
import ForgotEmail from './pages/ForgotEmail'
import ManageAdmins from './pages/ManageAdmin'

const Layout = () => {
	const [isAsideVisible, setIsAsideVisible] = useState(false)

	const toggleAside = () => {
		setIsAsideVisible((prevState) => !prevState)
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (event.target.closest('.aside') === null && isAsideVisible) {
				setIsAsideVisible(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isAsideVisible])

	return (
		<div className='page d-flex flex-row flex-column-fluid'>
			{isAsideVisible && (
				<div style={{ zIndex: 109 }} className='drawer-overlay'></div>
			)}
			<Aside isAsideVisible={isAsideVisible} />
			<div
				className='wrapper d-flex flex-column flex-row-fluid'
				id='kt_wrapper'
			>
				<Navbar toggleAside={toggleAside} />
				<Outlet />
				<Footer />
			</div>
		</div>
	)
}

export { Layout }

const AdminLayout = () => {
	const [isAsideVisible, setIsAsideVisible] = useState(false)

	const toggleAside = () => {
		setIsAsideVisible((prevState) => !prevState)
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (event.target.closest('.aside') === null && isAsideVisible) {
				setIsAsideVisible(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isAsideVisible])

	return (
		<div className='page d-flex flex-row flex-column-fluid'>
			{isAsideVisible && (
				<div style={{ zIndex: 109 }} className='drawer-overlay'></div>
			)}
			<AsideAdmin isAsideVisible={isAsideVisible} />
			<div
				className='wrapper d-flex flex-column flex-row-fluid'
				id='kt_wrapper'
			>
				<AdminNav toggleAside={toggleAside} />
				<Outlet />
				<Footer />
			</div>
		</div>
	)
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/parent-register',
		element: <Parent />,
	},
	{
		path: '/teacher-register',
		element: <Teacher />,
	},
	{
		path: '/role',
		element: <Role />,
	},
	{
		path: '/admin',
		element: <AdminLogin />,
	},
	{
		path: '/admin-register',
		element: <AdminRegister />,
	},
	{
		path: '/reset-password',
		element: <ResetPassword />,
	},
	{
		path: '/forgot-email',
		element: <ForgotEmail />,
	},
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/dashboard',
				element: <Home />,
			},
			{
				path: '/profile/:id',
				element: <Profile />,
			},
			{
				path: '/books/:id',
				element: <Books />,
			},
			{
				path: '/reset-email/:email',
				element: <UserEmail />,
			},
		],
	},
	{
		path: '/',
		element: <AdminLayout />,
		children: [
			{
				path: '/admin-dashboard',
				element: <AdminHome />,
			},
			{
				path: '/admin-profile',
				element: <AdminProfile />,
			},
			{
				path: '/change-email/:email',
				element: <ResetEmail />,
			},
			{
				path: '/user-list',
				element: <UsersList />,
			},
			{
				path: '/manage-event',
				element: <Event />,
			},
			{
				path: '/manage-book',
				element: <AdminBook />,
			},
			{
				path: '/book-details/:id',
				element: <BookDetails />,
			},
			{
				path: '/announcement',
				element: <Announce />,
			},
			{
				path: '/videos',
				element: <Videos />,
			},
			{
				path: '/manage-admins',
				element: <ManageAdmins />,
			},
		],
	},
])

function App() {
	return (
		<div className='d-flex flex-column flex-root'>
			<RouterProvider router={router} />
			<OneSignalComponent />
		</div>
	)
}

export default App
