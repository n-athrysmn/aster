import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import avatar from '../assets/avatar.png'
import { FaUpload, FaBullhorn, FaCalendarAlt } from 'react-icons/fa'
import axios from 'axios'

const AdminHome = () => {
	const { currentAdmin, isLoggedIn } = useContext(AuthContext)
	const [showAnnouncement, setShowAnnouncement] = useState(false)
	const [showUpload, setShowUpload] = useState(false)
	const [showEvent, setShowEvent] = useState(false)
	const [activeBtn, setActiveBtn] = useState('')

	const handleAnnouncementClick = () => {
		setShowAnnouncement(true)
		setShowUpload(false)
		setShowEvent(false)
		setActiveBtn('announcement')
	}

	const handleUploadClick = () => {
		setShowAnnouncement(false)
		setShowUpload(true)
		setShowEvent(false)
		setActiveBtn('upload')
	}

	const handleEventClick = () => {
		setShowAnnouncement(false)
		setShowUpload(false)
		setShowEvent(true)
		setActiveBtn('event')
	}

	const [books, setBooks] = useState([])

	useEffect(() => {
		async function fetchBooks() {
			try {
				console.log('Fetching books…')
				const response = await axios.get('/books/get-books')
				console.log('Response:', response)
				const data = response.data
				console.log('Data:', data)
				setBooks(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchBooks()
	}, [])

	const [inputs, setInputs] = useState({
		announceTitle: '',
		announce: '',
		vidTitle: '',
		vidUrl: '',
		book: '',
		eveTitle: '',
		eveDate: '',
	})

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')
	console.log(inputs)

	const handleChange = (e) => {
		const value =
			e.target.name === 'book' && e.target.value === 'null'
				? null
				: e.target.value
		setInputs((prev) => ({ ...prev, [e.target.name]: value }))
	}

	const handleAnnounceSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/others/announce', {
				...inputs,
				adminId: currentAdmin.id,
			})
			setSuccessMsg('Announcement has been created!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.message}`)
			console.log(err)
		}
	}

	const handleUploadSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/others/upload', inputs)
			setSuccessMsg('Video has been uploaded!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.message}`)
			console.log(err)
		}
	}

	const handleEventSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/others/event', inputs)
			setSuccessMsg('Event has been created!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.message}`)
			console.log(err)
		}
	}

	if (!isLoggedIn || !currentAdmin) {
		return <div>Loading...</div>
	}

	return (
		<div className='home'>
			<div className='top-part mb20'>
				<div className='card'>
					<div className='card-body center'>
						<div className='avatar mb20'>
							<img src={avatar} alt='avatar' />
						</div>
						<div className='info'>
							{currentAdmin ? (
								<h3>Hello, {currentAdmin.adminName}!</h3>
							) : (
								<h3>Hello, Guest!</h3>
							)}
						</div>
					</div>
				</div>
				<div className='card'>
					<div className='card-title'>
						{currentAdmin.adminName} tasks for today!
					</div>
					<div className='card-body'>
						<h2 className='center'>No available task</h2>
					</div>
				</div>
			</div>
			<div className='mt30 mb30'>
				<h2>What would you like to do?</h2>
			</div>
			<div className='row center'>
				<button
					className={
						activeBtn === 'announcement' ? 'toggle-btn active' : 'toggle-btn'
					}
					onClick={handleAnnouncementClick}
				>
					<FaBullhorn /> Announcement
				</button>
				<button
					className={
						activeBtn === 'upload' ? 'toggle-btn active' : 'toggle-btn'
					}
					onClick={handleUploadClick}
				>
					<FaUpload /> Upload
				</button>
				<button
					className={activeBtn === 'event' ? 'toggle-btn active' : 'toggle-btn'}
					onClick={handleEventClick}
				>
					<FaCalendarAlt /> New Event
				</button>
			</div>
			{showAnnouncement && (
				<div className='card' id='announcement'>
					<form action='' className='form-control'>
						<div className='card-title'>Post New Announcement</div>
						<div className='card-body'>
							<p className='mb10'>Enter announcement title</p>
							<input
								type={'text'}
								onChange={handleChange}
								className='input-field'
								placeholder='Ex: New book announcement'
								name='announceTitle'
							/>
							<span className='small mb20'>
								Other users won't be able to see this, this is for admin only.
							</span>
							<p className='mb10'>Write announcement in the box</p>
							<textarea
								className='textarea-field mb20'
								onChange={handleChange}
								placeholder='Ex: Announcement text goes here...'
								name='announce'
							/>
							{err && <p className='txt-danger'>{err}</p>}
							{successMsg && <p className='txt-success'>{successMsg}</p>}
						</div>
						<div className='card-footer'>
							<button type='button' className='danger-btn'>
								Cancel
							</button>
							<button
								type='button'
								className='success-btn'
								onClick={handleAnnounceSubmit}
								//className={`primary-btn ${isEditing ? 'success-btn' : ''}`} //if button have different styles
							>
								Post Announcement
							</button>
						</div>
					</form>
				</div>
			)}
			{showUpload && (
				<div className='card' id='upload'>
					<form action='' className='form-control'>
						<div className='card-title'>Upload new videos</div>
						<div className='card-body'>
							<p className='mb10'>Enter video title</p>
							<input
								type={'text'}
								className='mb20 input-field'
								onChange={handleChange}
								placeholder='Ex: How to score A+ in Maths?'
								name='vidTitle'
							/>
							<p className='mb10'>Enter video url</p>
							<input
								type={'url'}
								className='input-field'
								onChange={handleChange}
								placeholder='Ex: https://www.youtube.com/embed/video-id-here'
								name='vidUrl'
							/>
							<span className='small mb20'>
								You must follow this format{' '}
								<span className='txt-danger'>
									https://www.youtube.com/embed/video-id-here
								</span>{' '}
								! Otherwise error will occur.
							</span>
							<p className='mb10'>Select book (if any)</p>
							<select
								className='mb20 select-field'
								name='book'
								onChange={handleChange}
							>
								<option value={null}>No book</option>
								{books.map((book) => (
									<option key={book.id} value={book.id}>
										{book.name} ({book.isbn})
									</option>
								))}
							</select>
							{err && <p className='txt-danger'>{err}</p>}
							{successMsg && <p className='txt-success'>{successMsg}</p>}
						</div>
						<div className='card-footer'>
							<button type='button' className='danger-btn'>
								Cancel
							</button>
							<button
								type='button'
								className='success-btn'
								onClick={handleUploadSubmit}
								//className={`primary-btn ${isEditing ? 'success-btn' : ''}`} //if button have different styles
							>
								Save Changes
							</button>
						</div>
					</form>
				</div>
			)}
			{showEvent && (
				<div className='card' id='event'>
					<form action='' className='form-control'>
						<div className='card-title'>Create new event</div>
						<div className='card-body'>
							<p className='mb10'>Enter event title</p>
							<input
								type={'text'}
								className='mb20 input-field'
								onChange={handleChange}
								placeholder='Ex: Live Session with Tutor Amira'
								name='eveTitle'
							/>
							<p className='mb10'>Enter event date</p>
							<input
								type={'date'}
								onChange={handleChange}
								className='mb20 input-field'
								name='eveDate'
							/>
							{err && <p className='txt-danger'>{err}</p>}
							{successMsg && <p className='txt-success'>{successMsg}</p>}
						</div>
						<div className='card-footer'>
							<button type='button' className='danger-btn'>
								Cancel
							</button>
							<button
								type='button'
								className='success-btn'
								onClick={handleEventSubmit}
								//className={`primary-btn ${isEditing ? 'success-btn' : ''}`} //if button have different styles
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
