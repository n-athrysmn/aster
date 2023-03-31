import React, { useContext, useState } from 'react'
import Logo from '../assets/dark-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/authContext"
import { FaTimes, FaBars, FaUserCog } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import { IoIosAlbums } from 'react-icons/io'

const Navbar = () => {
    
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const [isClicked, setIsClicked] = useState(false) 

  const handleClick = () => {
      setIsClicked(!isClicked)
  }

  return (
    <div className='navbar'>
        <div className='container'>
            <div className='logo'>
                <Link to='/dashboard'>
                  <img src={Logo} alt='Aster Education'/>
                </Link>
            </div>
            <div className='toggler'><span onClick={handleClick}>{isClicked ? <FaTimes/> : <FaBars/> }</span></div>
            <div className={isClicked ? 'links active' : 'links' }>
                <Link to='/books'>
                  <IoIosAlbums/>
                </Link>
                <Link to='/profile'>
                  <FaUserCog/>
                </Link>
                <Link onClick={handleLogout}>
                    <HiOutlineLogout/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
