import React, { useContext, useState } from 'react'
import '../style.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/authContext"
import avatar from '../assets/avatar.png'
import Tabs from '../components/Tab'
import Accordion from '../components/Accordion'
import { BiSupport } from 'react-icons/bi'
import { FaSchool, FaEnvelope, FaLeanpub, FaTrophy, FaBook, FaQuestion } from 'react-icons/fa'
import { MdOutlineContactSupport, MdWhatsapp, MdOutlineQuestionAnswer, MdQuestionAnswer } from 'react-icons/md'

const AdminHome = () => {
    const { currentUser } = useContext(AuthContext)

  return (
    <div className='home'>
      <div className="top-part">
    <div className="profile-card">
      <div className="avatar">
        <img src={avatar} alt="avatar"/>
      </div>
      <div className="info">
        <h3>Hello, {currentUser.name}!</h3>
      </div>
    </div>
    </div>
    </div>
  )
}

export default AdminHome