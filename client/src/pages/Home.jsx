import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Tabs from '../components/Tab'
import Calendar from '../components/Calendar'
import { MdCelebration } from 'react-icons/md'
import Announcement from '../components/Announcements'
import axios from 'axios'
import Accords from '../components/Accords'
import BookModal from '../components/BookModal'
import Toolbar from '../layout/Toolbar'
import { FaTrashAlt, FaUserCircle } from 'react-icons/fa'

const Home = () => {
	const { currentUser, isLoggedIn } = useContext(AuthContext)
	const pageTitle = 'Home'
	const pageDescription = 'Welcome to the home page'

	const [books, setBooks] = useState([])
	const [videos, setVideos] = useState([])
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState(null)
	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const userId =
		currentUser?.studentId || currentUser?.parentId || currentUser?.teacherId
	const userType = currentUser?.studentId
		? 'student'
		: currentUser?.parentId
		? 'parent'
		: 'teacher'

	const email =
		currentUser?.studentEmail ||
		currentUser?.parentEmail ||
		currentUser?.teacherEmail

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/books/get-owned/${userId}`
				)
				const data = response.data.filter((book) => {
					if (userType === 'student') {
						return (
							book.studentId === currentUser.studentId &&
							book.parentId === null &&
							book.teacherId === null
						)
					} else if (userType === 'parent') {
						return (
							book.parentId === currentUser.parentId &&
							book.studentId === null &&
							book.teacherId === null
						)
					} else if (userType === 'teacher') {
						return (
							book.teacherId === currentUser.teacherId &&
							book.studentId === null &&
							book.parentId === null
						)
					} else {
						return false
					}
				})

				setBooks(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchBooks()
	}, [currentUser, userId, userType])

	const [student, setStudent] = useState([])
	const [parent, setParent] = useState([])
	const [teacher, setTeacher] = useState([])

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/getStudent/${email}`
				)

				const data = res.data

				setStudent(data)
			} catch (error) {
				console.error(error)
			}
		}

		const fetchParent = async () => {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/getParent/${email}`
				)

				const data = res.data

				setParent(data)
			} catch (error) {
				console.error(error)
			}
		}

		const fetchTeacher = async () => {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/getTeacher/${email}`
				)

				const data = res.data

				setTeacher(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchStudent()
		fetchParent()
		fetchTeacher()
	}, [email])

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/others/tab-videos`
				)

				const data = response.data

				setVideos(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchVideos()
	}, [])

	const [inputs, setInputs] = useState({
		isbn: selectedBook?.isbn || '',
		studentId: '',
		parentId: '',
		teacherId: '',
	})

	useEffect(() => {
		if (selectedBook) {
			setInputs((prevInputs) => ({
				...prevInputs,
				isbn: selectedBook.isbn,
			}))
		}
	}, [selectedBook])

	useEffect(() => {
		if (currentUser) {
			const {
				studentName,
				parentName,
				teacherName,
				studentId,
				parentId,
				teacherId,
			} = currentUser
			setInputs((prevInputs) => ({
				...prevInputs,
				studentId: studentName ? studentId : '',
				parentId: parentName ? parentId : '',
				teacherId: teacherName ? teacherId : '',
			}))
		}
	}, [currentUser, selectedBook])

	const handleDelete = async (e) => {
		e.preventDefault()
		try {
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/books/remove/${inputs.isbn}`,
				{ data: inputs } // Pass the inputs object as the request body
			)
			setSuccessMsg('Your book has been removed successfully!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
		}
	}

	const handleCancelEdit = () => {
		setShowDeleteModal(false)
		setInputs((prevInputs) => ({
			...prevInputs,
			isbn: '',
		}))
	}
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		// Function to check if the viewport is in mobile view
		const checkIsMobile = () => {
			const isMobileView = window.innerWidth <= 966 // Adjust the breakpoint as needed
			setIsMobile(isMobileView)
		}

		// Add event listener to check on window resize
		window.addEventListener('resize', checkIsMobile)

		// Initial check when component mounts
		checkIsMobile()

		// Clean up event listener when component unmounts
		return () => {
			window.removeEventListener('resize', checkIsMobile)
		}
	}, [])

	const navigate = useNavigate()

	if (!isLoggedIn || !currentUser) {
		return navigate('/')
	}

	/*const books = [
		{
			id: 1,
			title: 'Math Power',
			desc: 'Available from Vol. 1 to Vol. 8',
			img: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
		},
		{
			id: 2,
			title: 'Master Your Algebra',
			desc: 'Available from Vol. 1 to Vol. 5, and a Special Edition',
			img: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
		},
		{
			id: 3,
			title: 'The Anchor',
			desc: 'Available from Vol. 1 to Vol. 7',
			img: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
		},
	]

	const videos = [
		{
			id: 1,
			title: 'Lorem ipsumq',
			desc: 'Lorem ipsum',
			img: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
		},
		{
			id: 2,
			title: 'Lorem ipsumq2',
			desc: 'Lorem ipsum',
			img: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
		},
		{
			id: 3,
			title: 'Lorem ipsumq3',
			desc: 'Lorem ipsum',
			img: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
		},
	]*/
	const getTitle = (title) => {
		const [bookTitle] = title.split(/\s*\(([^)]+)\)\s*/)
		return bookTitle
	}

	const getVolume = (title) => {
		const volumeRegex = /\(([^)]+)\)/
		const match = volumeRegex.exec(title)
		return match ? `(${match[1]})` : ''
	}

	const tabs = [
		{
			id: 1,
			title: (
				<div className='nav-text text-gray-700 fw-bold fs-6 lh-1'>Books</div>
			),

			content: (
				<div className='card card-flush text-center'>
					<div className='card-body'>
						{Array.isArray(books) && books.length > 0 ? (
							<>
								{books.map((book) => (
									<div key={book.id} className='mb-2'>
										<Link to={`/books/${book.isbn}`}>
											<img
												src={book.img}
												alt={book.desc}
												className={`${isMobile ? 'w-100 h-50' : 'w-50 h-25'}`}
											/>
										</Link>
										<Link to={`/books/${book.isbn}`}>
											<h2 className='text-gray-800 text-hover-primary fw-bold'>
												{getTitle(book.name)}
												<br />
												{getVolume(book.name)}
											</h2>
										</Link>
										<div className='d-flex justify-content-center mb-10 mt-10'>
											{/* <!--begin::Link--> */}
											<button
												className='btn btn-danger me-7'
												onClick={() => {
													setSelectedBook(book)
													setInputs((prevInputs) => ({
														...prevInputs,
														isbn: book.isbn,
													}))
													setShowDeleteModal(true)
												}}
											>
												<FaTrashAlt />
											</button>
											{/* <!--end::Link--> */}
											{/* <!--begin::Link--> */}
											<a
												href={`/books/${book.isbn}`}
												className={`btn btn-primary ${
													isMobile ? 'w-75' : 'w-50'
												}`}
												role='button'
											>
												View Answers
											</a>
											{/* <!--end::Link--> */}
										</div>
									</div>
								))}
								<a
									target='_blank'
									href='https://ezy.la/GroupSupportKPBA'
									rel='noreferrer'
									role='button'
									className={`btn btn-info mb-10 ${
										isMobile ? 'w-100' : 'w-75'
									}`}
								>
									Join Telegram Kelab Pemilik Buku Aster
								</a>
							</>
						) : (
							<>
								<p className='text-danger'>
									{`If you have added book(s) but you are seeing this message, please refresh the page.`}
								</p>
								<p className='text-danger'>
									If you are new to this app and have not added any book yet,
									click the add book button below to add your book.
								</p>
								<p className='text-danger'>
									If you have not bought any book, please contact our marketing
									team to get your copy.
								</p>
							</>
						)}
						<div className='text-center'>
							<BookModal />
						</div>
					</div>
				</div>
			),
		},
		{
			id: 2,
			title: (
				<div className='nav-text text-gray-700 fw-bold fs-6 lh-1'>
					Knowledge Library
				</div>
			),
			content: (
				<div className='card card-flush text-center'>
					<div className='card-body row'>
						{Array.isArray(videos) && videos.length > 0 ? (
							videos.map((video) => (
								<div className='mb-10 col-4' key={video.id}>
									<div className='mb-5'>
										<iframe
											title={video.title}
											className='embed-responsive-item rounded h-300px w-100'
											src={video.link}
											allowFullScreen={true}
										/>
									</div>
									<div className='vid-links'>
										<Link to={video.link}>
											<h3 className='text-hover-primary fw-bold'>
												{video.title.length > 40
													? `${video.title.substring(0, 30)}...`
													: video.title}
											</h3>
										</Link>
									</div>
								</div>
							))
						) : (
							<p>
								Nothing here yet, please look forward to the contents we will be
								posting soon.
							</p>
						)}
					</div>
				</div>
			),
		},
	]

	return (
		<>
			<Toolbar pageTitle={pageTitle} pageDescription={pageDescription} />
			<div
				className='content d-flex flex-column flex-column-fluid'
				id='kt_content'
			>
				<div id='kt_content_container' className='container-xxl'>
					<Announcement />
					<div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
						<div className='col-xl-4'>
							<div className='card h-lg-100'>
								<div className='card-body pt-15 pb-15'>
									{currentUser?.studentName && (
										<>
											<div className='text-center'>
												<h2 className='text-gray-400 fs-4 fw-semibold'>
													Hello <MdCelebration />
												</h2>
												{student.studentPfp ? (
													<img
														src={`https://aster-server-z9ckn.ondigitalocean.app/student/${student.studentPfp}`}
														alt={student.studentName}
														className='w-250px h-250px mb-5 mt-5'
													/>
												) : (
													<FaUserCircle className='w-150px h-150px mb-10 mt-10' />
												)}
												<h3 className='fs-2x fw-bold mb-0'>
													{currentUser?.studentName}!
												</h3>
											</div>
										</>
									)}
									{currentUser?.parentName && (
										<>
											<div className='text-center'>
												<h2 className='text-gray-400 fs-4 fw-semibold'>
													Hello <MdCelebration />
												</h2>
												{parent.parentPfp ? (
													<img
														src={`https://aster-server-z9ckn.ondigitalocean.app/parent/${parent.parentPfp}`}
														alt={parent.parentName}
														className='w-250px h-250px mb-5 mt-5'
													/>
												) : (
													<FaUserCircle className='w-150px h-150px mb-10 mt-10' />
												)}
												<h3 className='fs-2x fw-bold mb-0'>
													{currentUser?.parentName}!
												</h3>
											</div>
										</>
									)}
									{currentUser?.teacherName && (
										<>
											<div className='text-center'>
												<h2 className='text-gray-400 fs-4 fw-semibold'>
													Hello <MdCelebration />
												</h2>
												{teacher.teacherPfp ? (
													<img
														src={`https://aster-server-z9ckn.ondigitalocean.app/teacher/${teacher.teacherPfp}`}
														alt={teacher.teacherName}
														className='w-250px h-250px mb-5 mt-5'
													/>
												) : (
													<FaUserCircle className='w-150px h-150px mb-10 mt-10' />
												)}
												<h3 className='fs-2x fw-bold mb-0'>
													{currentUser?.teacherName}!
												</h3>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						<div className='col-xl-8'>
							<div className='card h-lg-100'>
								<div className='card-body pt-15 pb-15'>
									<Calendar />
								</div>
							</div>
						</div>
					</div>
					<Tabs tabs={tabs} />
					<Accords />
					{/*delete modal*/}
					{showDeleteModal ? (
						<div className='modal'>
							<div className='modal-content'>
								<div className='modal-header'>
									<h2>Remove book</h2>
									<p
										className='right-header'
										onClick={() => setShowDeleteModal(false)}
									>
										X
									</p>
								</div>
								<form className='form-control'>
									<div className='modal-body p-10'>
										<p className='text-danger'>
											Are you sure you want to remove the book below?
										</p>
										{/* <!--begin::Input group--> */}
										<div className='d-flex flex-column mb-8 fv-row'>
											{/* <!--begin::Label--> */}
											<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
												<span>Book Name</span>
											</label>
											{/* <!--end::Label--> */}
											<input
												type='text'
												className='form-control form-control-solid'
												value={selectedBook ? selectedBook.name : ''}
												name='bookName'
												disabled
											/>
										</div>
										{/* <!--end::Input group--> */}
										{/* <!--begin::Input group--> */}
										<div className='d-flex flex-column fv-row'>
											{/* <!--begin::Label--> */}
											<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
												<span>Book ISBN</span>
											</label>
											{/* <!--end::Label--> */}
											<input
												type='text'
												className='form-control form-control-solid'
												value={inputs.isbn}
												name='isbn'
												disabled
											/>
										</div>
										{err && <p className='text-danger'>{err}</p>}
										{successMsg && <p className='text-success'>{successMsg}</p>}
									</div>
									<div className='modal-footer'>
										<button
											className='btn btn-sm btn-danger'
											onClick={() => {
												handleCancelEdit()
												setShowDeleteModal(false)
											}}
										>
											No, cancel
										</button>
										<button
											className='btn btn-sm btn-light-danger'
											onClick={handleDelete}
										>
											Yes, remove
										</button>
									</div>
								</form>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</>
	)
}

export default Home
