import React, { useContext, useState } from 'react'
import Logo from '../assets/dark-logo.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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

  const [activeLink, setActiveLink] = useState(null);

  const handleMouseEnter = (link) => {
    setActiveLink(link);
  };

  const handleMouseLeave = () => {
    setActiveLink(null);
  };

  const location = useLocation();

  return (
    <div className='navbar'>
        <div className='container'>
            <div className='logo'>
                <Link to='/dashboard'>
                  <img src={Logo} alt='Aster Education'/>
                </Link>
            </div>
            <div className='toggler'><span onClick={handleClick}>{isClicked ? <FaTimes/> : <FaBars/> }</span></div>
            <div className='links'>
                <Link
                  onMouseEnter={() => handleMouseEnter('books')}
                  onMouseLeave={handleMouseLeave} 
                  to='/books' 
                  className={location.pathname === '/books' ? 'nav-link active' : 'nav-link' }
                >
                  <span><IoIosAlbums/></span>
                  {activeLink === 'books' && (
                    <div className="popover-content">
                      <p>Books</p>
                    </div>
                  )}
                </Link>
                <Link
                  onMouseEnter={() => handleMouseEnter('profile')}
                  onMouseLeave={handleMouseLeave} 
                  to='/profile' 
                  className={location.pathname === '/profile' ? 'nav-link active' : 'nav-link' }
                >
                  <span><FaUserCog/></span>
                  {activeLink === 'profile' && (
                    <div className="popover-content">
                      <p>Profile</p>
                    </div>
                  )}
                </Link>
                <Link
                  onMouseEnter={() => handleMouseEnter('logout')}
                  onMouseLeave={handleMouseLeave} 
                  onClick={handleLogout}
                  className={location.pathname === '/logout' ? '' : 'nav-link' }
                >
                  <span><HiOutlineLogout/></span>
                  {activeLink === 'logout' && (
                    <div className="popover-content">
                      <p>Logout</p>
                    </div>
                  )}
                </Link>
            </div>
            <div className={isClicked ? 'small-links active' : 'small-links' }>
              <Link to='/books' className={location.pathname === '/books' ? 'nav-link active' : 'nav-link' }>
                <span><IoIosAlbums className='mr20'/> Books</span>
              </Link>
              <Link to='/profile' className={location.pathname === '/profile' ? 'nav-link active' : 'nav-link' }>
                <span><FaUserCog className='mr20'/> Profile</span>
              </Link>
              <Link onClick={handleLogout} className='nav-link'>
                <span><HiOutlineLogout className='mr20'/> Logout</span>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
