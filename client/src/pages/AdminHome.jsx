import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import {
	FaUpload,
	FaBullhorn,
	FaCalendarAlt,
	FaUserCircle,
} from 'react-icons/fa'
import axios from 'axios'
import Tasks from '../components/Tasks'
import { MdCelebration } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Toolbar from '../layout/Toolbar'

const AdminHome = () => {
	const pageTitle = 'Home'
	const pageDescription = 'Welcome to the admin home page'
	const { currentAdmin, isLoggedIn } = useContext(AuthContext)
	const adminId = currentAdmin?.id
	console.log('admin id: ', adminId)
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
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/books/get-books`
				)
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
			await axios.post(`${process.env.REACT_APP_API_URL}/others/announce`, {
				...inputs,
				adminId,
			})
			setSuccessMsg('Announcement has been created!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const handleUploadSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/others/upload`, inputs)
			setSuccessMsg('Video has been uploaded!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const handleEventSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/others/event`, inputs)
			setSuccessMsg('Event has been created!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const navigate = useNavigate()

	if (!isLoggedIn || !currentAdmin) {
		return navigate('/admin')
	}

	return (
		<>
			<Toolbar pageTitle={pageTitle} pageDescription={pageDescription} />
			<div
				className='content d-flex flex-column flex-column-fluid'
				id='kt_content'
			>
				<div id='kt_content_container' className='container-xxl'>
					<div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
						<div className='col-xl-4'>
							<div className='card h-lg-100'>
								<div className='card-body'>
									{currentAdmin ? (
										<>
											<div className='card-px text-center pt-15 pb-15'>
												<h2 className='text-gray-400 fs-4 fw-semibold py-7'>
													Hello <MdCelebration />
												</h2>
												{/* <FaUserCircle className='w-150px h-150px mb-10 mt-10' /> */}
												{/* <div className='text-center pb-15 px-5'>
												<img
													src={currentUser?.studentPfp}
													alt={currentUser?.studentName}
													className='mw-100 h-200px h-sm-325px'
												/>
											</div> */}
												<h3 className='fs-2x fw-bold mb-0'>
													{currentAdmin.adminName}!
												</h3>
											</div>
										</>
									) : (
										<h3>Please login!</h3>
									)}
								</div>
							</div>
						</div>
						<div className='col-xl-8'>
							<Tasks />
						</div>
					</div>
					<div className='mt-10 mb-10'>
						<h2>What would you like to do?</h2>
					</div>
					<div className='row'>
						<div className='col-lg-4'>
							<button
								className={
									activeBtn === 'announcement'
										? 'w-100 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
										: 'w-100 btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
								}
								onClick={handleAnnouncementClick}
							>
								<FaBullhorn className='me-10' /> Announcement
							</button>
						</div>
						<div className='col-lg-4'>
							<button
								className={
									activeBtn === 'upload'
										? 'w-100 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
										: 'w-100 btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
								}
								onClick={handleUploadClick}
							>
								<FaUpload className='me-10' /> Upload
							</button>
						</div>
						<div className='col-lg-4'>
							<button
								className={
									activeBtn === 'event'
										? 'w-100 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
										: 'w-100 btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
								}
								onClick={handleEventClick}
							>
								<FaCalendarAlt className='me-10' /> New Event
							</button>
						</div>
					</div>
					{showAnnouncement && (
						<div className='card' id='announcement'>
							<form action='' className='form'>
								<div className='card-header'>
									<div className='card-title'>Post New Announcement</div>
								</div>
								<div className='card-body'>
									{/*begin::Input group*/}
									<div className='row mb-6'>
										{/*begin::Label*/}
										<label className='col-lg-4 col-form-label fw-semibold fs-6'>
											Enter announcement title
										</label>
										{/*end::Label*/}
										{/*begin::Col*/}
										<div className='col-lg-8 fv-row'>
											<input
												type={'text'}
												onChange={handleChange}
												placeholder='Ex: New book announcement'
												name='announceTitle'
												className='form-control form-control-lg form-control-solid'
											/>
											<div className='form-text text-primary'>
												Other users won't be able to see this, this is for admin
												only.
											</div>
										</div>
										{/*end::Col*/}
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='row mb-6'>
										{/*begin::Label*/}
										<label className='col-lg-4 col-form-label fw-semibold fs-6'>
											Write announcement in the box
										</label>
										{/*end::Label*/}
										{/*begin::Col*/}
										<div className='col-lg-8 fv-row'>
											<textarea
												onChange={handleChange}
												placeholder='Ex: Announcement text goes here...'
												name='announce'
												className='form-control form-control-lg form-control-solid'
												rows='3'
											/>
										</div>
										{/*end::Col*/}
									</div>
									{/*end::Input group*/}
								</div>
							</form>
							{err && <p className='text-danger'>{err}</p>}
							{successMsg && <p className='text-success'>{successMsg}</p>}
							<div className='card-footer d-flex justify-content-between py-6 px-9'>
								<button type='button' className='btn btn-danger'>
									Cancel
								</button>
								<button
									type='button'
									className='btn btn-success'
									onClick={handleAnnounceSubmit}
									//className={`primary-btn ${isEditing ? 'btn-success' : ''}`} //if button have different styles
								>
									Post Announcement
								</button>
							</div>
						</div>
					)}
					{showUpload && (
						<div className='card' id='upload'>
							<form action='' className='form'>
								<div className='card-header'>
									<div className='card-title'>Upload new videos</div>
								</div>
								<div className='card-body'>
									{/*begin::Input group*/}
									<div className='row mb-6'>
										{/*begin::Label*/}
										<label className='col-lg-4 col-form-label fw-semibold fs-6'>
											Enter video title
										</label>
										{/*end::Label*/}
										{/*begin::Col*/}
										<div className='col-lg-8 fv-row'>
											<input
												type={'text'}
												onChange={handleChange}
												placeholder='Ex: How to score A+ in Maths?'
												name='vidTitle'
												className='form-control form-control-lg form-control-solid'
											/>
										</div>
										{/*end::Col*/}
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='row mb-6'>
										{/*begin::Label*/}
										<label className='col-lg-4 col-form-label fw-semibold fs-6'>
											Enter video title
										</label>
										{/*end::Label*/}
										{/*begin::Col*/}
										<div className='col-lg-8 fv-row'>
											<input
												type={'text'}
												onChange={handleChange}
												placeholder='Enter video ID here'
												name='vidUrl'
												className='form-control form-control-lg form-control-solid'
											/>
											<div className='form-text text-primary'>
												You can get the video ID from the link in the URL bar of
												your browser. Eg: https://www.youtube.com/watch?v=
												<span className='text-danger'>video-id-here</span>
												&ab_channel
											</div>
										</div>
										{/*end::Col*/}
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='row mb-6'>
										{/*begin::Label*/}
										<label className='col-lg-4 col-form-label fw-semibold fs-6'>
											Select book (if any)
										</label>
										{/*end::Label*/}
										{/*begin::Col*/}
										<div className='col-lg-8 fv-row'>
											<select
												className='form-select form-select-solid form-select-lg fw-semibold'
												name='book'
												onChange={handleChange}
											>
												<option value={null}>No book</option>
												{books.map((book) => (
													<option key={book.id} value={book.id}>
														{book.name} ({book.isbn}) - {book.desc}
													</option>
												))}
											</select>
										</div>
										{/*end::Col*/}
									</div>
									{/*end::Input group*/}
									{err && <p className='text-danger'>{err}</p>}
									{successMsg && <p className='text-success'>{successMsg}</p>}
								</div>
								<div className='card-footer d-flex justify-content-between py-6 px-9'>
									<button type='button' className='btn btn-danger'>
										Cancel
									</button>
									<button
										type='button'
										className='btn btn-success'
										onClick={handleUploadSubmit}
										//className={`primary-btn ${isEditing ? 'btn-success' : ''}`} //if button have different styles
									>
										Save Changes
									</button>
								</div>
							</form>
						</div>
					)}
					{showEvent && (
						<div className='card' id='event'>
							<form action='' className='form'>
								<div className='card-header'>
									<div className='card-title'>Create new event</div>
								</div>
								<div className='card-body'>
									{/*begin::Input group*/}
									<div className='row mb-6'>
										{/*begin::Label*/}
										<label className='col-lg-4 col-form-label fw-semibold fs-6'>
											Enter event title
										</label>
										{/*end::Label*/}
										{/*begin::Col*/}
										<div className='col-lg-8 fv-row'>
											<input
												type={'text'}
												onChange={handleChange}
												placeholder='Ex: Live Session with Tutor Amira'
												name='eveTitle'
												className='form-control form-control-lg form-control-solid'
											/>
										</div>
										{/*end::Col*/}
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='row mb-6'>
										{/*begin::Label*/}
										<label className='col-lg-4 col-form-label fw-semibold fs-6'>
											Enter event date
										</label>
										{/*end::Label*/}
										{/*begin::Col*/}
										<div className='col-lg-8 fv-row'>
											<input
												type={'date'}
												onChange={handleChange}
												placeholder='Ex: Live Session with Tutor Amira'
												name='eveDate'
												className='form-control form-control-lg form-control-solid'
											/>
										</div>
										{/*end::Col*/}
									</div>
									{/*end::Input group*/}
									{err && <p className='text-danger'>{err}</p>}
									{successMsg && <p className='text-success'>{successMsg}</p>}
								</div>
								<div className='card-footer d-flex justify-content-between py-6 px-9'>
									<button type='button' className='btn btn-danger'>
										Cancel
									</button>
									<button
										type='button'
										className='btn btn-success'
										onClick={handleEventSubmit}
										//className={`primary-btn ${isEditing ? 'btn-success' : ''}`} //if button have different styles
									>
										Save Changes
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default AdminHome
