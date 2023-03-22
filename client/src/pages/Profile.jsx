import React from 'react'
import { useContext } from 'react'
import '../style.scss'
import avatar from '../assets/avatar.png'
import { AuthContext } from '../context/authContext'
import { FaUserGraduate, FaEnvelope, FaPhoneAlt, FaBirthdayCake, FaHome, FaSchool, FaLeanpub, FaTrophy, FaBriefcase, FaMoneyCheckAlt } from 'react-icons/fa'

const Profile = () => {

    const { currentUser } = useContext(AuthContext);
    const dateStr = currentUser.studentBirth;
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'}).replace(/\//g, '/');
  
    return (
      <div className='profile'>
        <h1>Profile Details</h1>
      <div className="profile-card">
        <div className="avatar">
        {/*{currentUser?.studentName && (
          <img src={currentUser?.studentPfp} alt={currentUser?.studentName} />
        )}
        {currentUser?.parentName && (
          <img src={currentUser?.parentPfp} alt={currentUser?.parentName} />
        )}*/}
        <img src={avatar} alt="avatar"/>
        </div>
        <div className="info">
          <form className='form-control'>
            {currentUser?.studentName && (
              <>
                <div className='row'>
                  <div className="form-label">Name</div>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.studentName} readOnly/>
                    <div className="input-icon">
                      <FaUserGraduate/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-label">Email</div>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.studentEmail} readOnly/>
                    <div className="input-icon">
                      <FaEnvelope/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-label">Phone Number</div>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.studentNumber} readOnly/>
                    <div className="input-icon">
                      <FaPhoneAlt/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-label">Birth date</div>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={formattedDate} readOnly/>
                    <div className="input-icon">
                      <FaBirthdayCake/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-label">Address</div>
                  <div className='input-group input-group-icon'>
                    <textarea value={currentUser.studentAddr} readOnly/>
                    <div className="input-icon">
                      <FaHome/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-label">School Name</div>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.studentSch} readOnly/>
                    <div className="input-icon">
                      <FaSchool/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-label">Education Level</div>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.studentLevel} readOnly/>
                    <div className="input-icon">
                      <FaLeanpub/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-label">Mathematics Grade</div>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.studentGrade} readOnly/>
                    <div className="input-icon">
                      <FaTrophy/>
                    </div>
                  </div>
                </div>
              </>
            )}
            {currentUser?.parentName && (
              <>
                <div className='row'>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.parentName} readOnly/>
                    <div className="input-icon">
                      <FaUserGraduate/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.parentEmail} readOnly/>
                    <div className="input-icon">
                      <FaEnvelope/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.parentNumber} readOnly/>
                    <div className="input-icon">
                      <FaPhoneAlt/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-group input-group-icon'>
                    <textarea value={currentUser.parentAddr} readOnly/>
                    <div className="input-icon">
                      <FaHome/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.parentJob} readOnly/>
                    <div className="input-icon">
                      <FaBriefcase/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} value={currentUser.parentSalary} readOnly/>
                    <div className="input-icon">
                      <FaMoneyCheckAlt/>
                    </div>
                  </div>
                </div>
              </>
            )}
            <button className='primary-btn'>Edit profile</button>
          </form>
        </div>
      </div>
      </div>
    )
}

export default Profile
