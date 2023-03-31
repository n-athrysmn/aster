import React, { useContext, useState } from 'react'
import '../style.scss'
import { AuthContext } from "../context/authContext"
import avatar from '../assets/avatar.png'
import { FaUpload, FaBullhorn, FaCalendarAlt } from 'react-icons/fa'

const AdminHome = () => {
    const { currentAdmin, isLoggedIn } = useContext(AuthContext)
    const [showAnnouncement, setShowAnnouncement] = useState(false)
    const [showUpload, setShowUpload] = useState(false)
    const [showEvent, setShowEvent] = useState(false)
    const [activeBtn, setActiveBtn] = useState('')

    const handleAnnouncementClick = () => {
    setShowAnnouncement(true);
    setShowUpload(false);
    setShowEvent(false);
    setActiveBtn('announcement');
    };
    
    const handleUploadClick = () => {
    setShowAnnouncement(false);
    setShowUpload(true);
    setShowEvent(false);
    setActiveBtn('upload');
    };
    
    const handleEventClick = () => {
    setShowAnnouncement(false);
    setShowUpload(false);
    setShowEvent(true);
    setActiveBtn('event');
    }; 
    
    if (!isLoggedIn || !currentAdmin) {
      return <div>Loading...</div>;
    }

  return (
    <div className='home'>
      <div className="top-part mb20">
        <div className="card">
          <div className="card-body center">
          <div className="avatar mb20">
            <img src={avatar} alt="avatar"/>
          </div>
          <div className="info">
            {currentAdmin ? (
              <h3>Hello, {currentAdmin.adminName}!</h3>
            ) : (
              <h3>Hello, Guest!</h3>
            )}
          </div>
          </div>
        </div>
      <div className="card">
        <div className="card-title">{currentAdmin.adminName} tasks for today!</div>
        <div className="card-body">
          <h2 className='center'>No available task</h2>
        </div>
      </div>
      </div>
      <div className="mt30 mb30">
        <h2>What would you like to do?</h2>
      </div>
      <div className="row center">
        <button 
          className={
          activeBtn === 'announcement' ? 'toggle-btn active' : 'toggle-btn'
          }
          onClick={handleAnnouncementClick}
        >
          <FaBullhorn/> Announcement
        </button>
        <button 
          className={
            activeBtn === 'upload' ? 'toggle-btn active' : 'toggle-btn'
          }
          onClick={handleUploadClick}
        >
          <FaUpload/> Upload
        </button>
        <button
          className={
            activeBtn === 'event' ? 'toggle-btn active' : 'toggle-btn'
          }
          onClick={handleEventClick}
        >
          <FaCalendarAlt/> New Event
        </button>
      </div>
      {showAnnouncement && (
          <div className="card" id='announcement'>
              <form action="" className='form-control'>
                  <div className="card-title">Post New Announcement</div>
                  <div className="card-body">
                      <p className='mb10'>Write announcement in the box</p>
                      <textarea className='textarea-field' placeholder='Ex: Announcement text goes here...'/>
                  </div>
                  <div className="card-footer">
                      <button
                          type="button"
                          className="close-btn"
                          onClick={handleAnnouncementClick}
                      >
                          Cancel
                      </button>
                      <button
                          type="button"
                          className="save-btn"
                          //className={`primary-btn ${isEditing ? 'save-btn' : ''}`} //if button have different styles

                      >
                          Save Changes
                      </button>
                  </div>
              </form>
          </div>
      )}
      {showUpload && (
      <div className="card" id='upload'>
          <form action="" className='form-control'>
        <div className="card-title">Upload new videos</div>
        <div className="card-body">
          <p className='mb10'>Enter video title</p>
          <input type={'text'} className='mb20 input-field' placeholder='Ex: How to score A+ in Maths?'/>
          <p className='mb10'>Enter video url</p>
          <input type={'url'} className='0 input-field' placeholder='Ex: https://www.youtube.com/embed/video-id-here'/>
          <span className='small'>You must follow the video link format as stated in the input box! Otherwise error will occur.</span>
        </div>
        <div className="card-footer">
              <button
                type="button"
                className="close-btn"
                
              >
                Cancel
              </button>
            <button
              type="button"
              className="save-btn"
              //className={`primary-btn ${isEditing ? 'save-btn' : ''}`} //if button have different styles
              
            >
              Save Changes
            </button>
        </div>
          </form>
      </div>
      )}
      {showEvent && (
      <div className="card" id='event'>
          <form action="" className='form-control'>
        <div className="card-title">Create new event</div>
        <div className="card-body">
          <p className='mb10'>Enter event title</p>
          <input type={'text'} className='mb20 input-field' placeholder='Ex: Live Session with Tutor Amira'/>
          <p className='mb10'>Enter event date</p>
          <input type={'date'} className='mb20 input-field'/>
        </div>
        <div className="card-footer">
              <button
                type="button"
                className="close-btn"
                
              >
                Cancel
              </button>
            <button
              type="button"
              className="save-btn"
              //className={`primary-btn ${isEditing ? 'save-btn' : ''}`} //if button have different styles
              
            >
              Save Changes
            </button>
        </div>
          </form>
      </div>
      )}
    </div>
  )
}

export default AdminHome
