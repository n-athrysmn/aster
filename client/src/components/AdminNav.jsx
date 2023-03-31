import React, { useContext, useState } from 'react'
import Logo from '../assets/dark-logo.png'
import AltLogo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/authContext"
import { FaTimes, FaBars } from 'react-icons/fa'

const AdminNav = () => {

  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const handleLogout = async () => {
    await logout()
    navigate('/admin')
  }

  const [isClicked, setIsClicked] = useState(false) 
  const [logo, setLogo] = useState(Logo) // initialize logo state with default logo
  const [logoClass, setLogoClass] = useState('') // initialize logo class state with empty string

  const handleClick = () => {
      setIsClicked(!isClicked)
      setLogo(isClicked ? Logo : AltLogo) // change logo based on toggler state
      setLogoClass(isClicked ? '' : 'alt-logo') // change logo class based on toggler state
  }

  return (
    <div className='navbar'>
        <div className='container'>
            <div className={`logo ${logoClass}`}>
                <Link to='/admin-dashboard'>
                  <img src={logo} alt='Aster Education'/> {/* use logo state */}
                </Link>
            </div>
            <div className='toggler'><span onClick={handleClick}>{isClicked ? <FaTimes/> : <FaBars/> }</span></div>
            <div className={isClicked ? 'links active' : 'links' }>
                <Link className='nav-link' to='/admin-profile'>
                  Profile
                </Link>
                <Link className='nav-link' onClick={handleLogout}>
                    Logout
                </Link>
            </div>
        </div>
    </div>
  )
}

export default AdminNav