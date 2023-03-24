import './style.scss'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom'
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

const Layout = () =>{
    return(
        <>
          <Navbar/>
          <Outlet/>
          <Footer/>
        </>
    )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/parent-register",
    element: <Parent/>,
  },
  {
    path: "/teacher-register",
    element: <Teacher/>,
  },
  {
    path: "/role",
    element: <Role/>,
  },
  {
    path: "/admin",
    element: <AdminLogin/>,
  },
  {
    path: "/admin-register",
    element: <AdminRegister/>,
  },
  {
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "/dashboard",
            element: <Home/>,
        },
        {
          path: "/profile",
          element: <Profile/>,
        },
        {
          path: "/books",
          element: <Books/>,
        },
        {
          path: "/admin-dashboard",
          element: <AdminHome/>,
        },
    ]
  },
])

function App() {
  return (
    <div className="app">
        <div className='container'>
            <RouterProvider router={router} />
        </div>    
    </div>
  )
}

export default App
