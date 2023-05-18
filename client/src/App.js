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

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	)
}

const AdminLayout = () => {
	return (
		<>
			<AdminNav />
			<Outlet />
			<Footer />
		</>
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
		],
	},
])

function App() {
	return (
		<div className='app'>
			<div className='container'>
				<RouterProvider router={router} />
				<OneSignalComponent />
			</div>
		</div>
	)
}

export default App
