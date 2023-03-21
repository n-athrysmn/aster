import React, { useContext } from 'react'
import Logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import '../style.scss'
import { AuthContext } from "../context/authContext";

const Navbar = () => {
    
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className='navbar'>
        <div className='container'>
            <div className='logo'>
                <Link to='/dashboard'>
                  <img src={Logo} alt='Aster Education'/>
                </Link>
            </div>
            <div className='links'>
                <Link className='link' to='/?books'>
                    Books
                </Link>
                <Link className='link' to='/profile'>
                  {currentUser?.studentName && (
                    <>{currentUser.studentName}</>
                  )}
                  {currentUser?.parentName && (
                    <>{currentUser.parentName}</>
                  )}
                </Link>
                <Link className='link' onClick={handleLogout}>
                    Logout
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
