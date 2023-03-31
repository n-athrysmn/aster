import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../style.scss'
import avatar from '../assets/avatar.png'
import { AuthContext } from '../context/authContext'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import { BsPersonVcard } from 'react-icons/bs'

const AdminProfile = () => {

  const [inputs, setInputs] = useState({
      name:"",
      email:"",
      staffId:"",
      pfp: null
  })

  const [err, setError] = useState(null)
  console.log(inputs)

  const { 
    currentAdmin: 
    { 
      adminName,
      adminEmail,
      staffId,
      adminPfp

    } 
  } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  const [updatedProfileData, setUpdatedProfileData] = useState({});
  const navigate = useNavigate();

  const [setAdminPfp] = useState(adminPfp || avatar);

  const handleToggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      const inputs = document.querySelectorAll('.form-profile input, .form-profile textarea');
      const updatedData = {};
      inputs.forEach(input => {
        updatedData[input.name] = input.value;
      });
      setUpdatedProfileData(updatedData);
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    const inputs = document.querySelectorAll('.form-profile input, .form-profile textarea');
    inputs.forEach(input => {
      input.value = input.defaultValue;
    });
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try{
        await axios.post("/auth/register", inputs)
        navigate("/")
    }catch(err){
        setError(err.response.data)
    }
}

  const handleChange = e => {
      if (e.target.name === 'pfp') {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setInputs(prev => ({ ...prev, [e.target.name]: file }));
        setUpdatedProfileData(prev => ({ ...prev, [e.target.name]: imageUrl }));
        setAdminPfp(imageUrl);
      } else {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
      }
  }

  return (
    <div className='profile'>
      <h1>Profile Details</h1>
      <div className="profile-card">
        <div className="info">
          <form className='form-profile' onSubmit={handleSubmit}>
            {adminName && (
              <>
              <div className="avatar-row">
                <div className="avatar mb20">
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                    name="pfp"
                  />
                  {isEditing ? (
                    <label htmlFor="file">
                      <img src={adminPfp} alt="avatar" />
                    </label>
                  ) : (
                    <img src={adminPfp} alt="avatar" />
                  )}
                </div>
                {isEditing ? (
                  <div className="form-label">Click the image to change your picture</div>
                ) : null}
              </div>
                <div className='form-row'>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} defaultValue={adminName} disabled={!isEditing}/>
                    <div className="input-icon">
                      <FaUser/>
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} defaultValue={adminEmail} disabled={!isEditing}/>
                    <div className="input-icon">
                      <FaEnvelope/>
                    </div>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='input-group input-group-icon'>
                    <input type={'text'} defaultValue={staffId} disabled={!isEditing}/>
                    <div className="input-icon">
                      <BsPersonVcard/>
                    </div>
                  </div>
                </div>
              </>
            )}
          {isEditing && (
            <div className="button-group">
              {err && <p>{err}</p>}
              <button
                type="button"
                className="save-btn"
                //className={`primary-btn ${isEditing ? 'save-btn' : ''}`} //if button have different styles
                onClick={handleToggleEditMode}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          )}
          {!isEditing && (
            <button
              type="button"
              className="primary-btn"
              onClick={handleToggleEditMode}
            >
              Edit Profile
            </button>
          )}
          </form>
        </div>
      </div>
    </div>
    )
}

export default AdminProfile
