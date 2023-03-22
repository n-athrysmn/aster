import React, { useContext, useState } from 'react'
import Logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import '../style.scss'
import { AuthContext } from "../context/authContext"
import { FaTimes, FaBars } from 'react-icons/fa'

const Navbar = () => {
    
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const [isClicked, setIsClicked] = useState(false); 

  const handleClick = () => {
      setIsClicked(!isClicked);
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
                <Link className='nav-link' to='/books'>
                    Books
                </Link>
                <Link className='nav-link' to='/profile'>
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

export default Navbar
