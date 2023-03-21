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
    ]
  },
]);

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
