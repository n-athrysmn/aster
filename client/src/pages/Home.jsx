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

const Home = () => {
	const { currentUser, isLoggedIn } = useContext(AuthContext)

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

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				console.log('Fetching books…')
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/books/get-owned/${userId}`
				)
				console.log('Response:', response)
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
				console.log('Data:', data)
				setBooks(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchBooks()
	}, [currentUser, userId, userType])

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				console.log('Fetching videos…')
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/others/tab-videos`
				)
				console.log('Response:', response)
				const data = response.data
				console.log('Data:', data)
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
			console.log(err)
		}
	}

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	console.log('delete book: ', inputs)

	const handleCancelEdit = () => {
		setShowDeleteModal(false)
		setInputs((prevInputs) => ({
			...prevInputs,
			isbn: '',
		}))
	}

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

	const tabs = [
		{
			id: 1,
			title: (
				<div className='nav-text text-gray-700 fw-bold fs-6 lh-1'>Books</div>
			),

			content: (
				<div className='m-0'>
					{Array.isArray(books) && books.length > 0 ? (
						<>
							{books.map((book) => (
								<div key={book.id} className='mb-2'>
									<Link to={`/books/${book.isbn}`}>
										<img
											src={book.img}
											alt={book.desc}
											className='mw-400px mh-400px'
										/>
									</Link>
									<Link to={`/books/${book.isbn}`}>
										<h2>{book.name}</h2>
									</Link>
									<div className='d-flex justify-content-evenly mb-10 mt-10'>
										{/* <!--begin::Link--> */}
										<button
											className='btn btn-danger'
											onClick={() => {
												setSelectedBook(book)
												setInputs((prevInputs) => ({
													...prevInputs,
													isbn: book.isbn,
												}))
												setShowDeleteModal(true)
											}}
											data-bs-toggle='modal'
											data-bs-target='#remove-book'
										>
											Remove Book
										</button>
										{/* <!--end::Link--> */}
										{/* <!--begin::Link--> */}
										<a
											href={`/books/${book.isbn}`}
											className='btn btn-primary'
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
								className='btn btn-info mb-10'
							>
								Join Telegram Kelab Pemilik Buku Aster
							</a>
						</>
					) : (
						<p className='text-danger'>
							You have not added any book yet. Click the add book button below
							to add your book. If you have not bought any book, please contact
							our marketing team to get your copy.
						</p>
					)}
					<BookModal />
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
				<div className='row wrap'>
					{Array.isArray(videos) && videos.length > 0 ? (
						videos.map((video) => (
							<div className='mb20' key={video.id}>
								<div className='mb20'>
									<iframe
										title={video.title}
										className='videos'
										src={video.link}
										allowFullScreen={true}
									/>
								</div>
								<div className='vid-links'>
									<Link to={video.link} className='link'>
										<h3>
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
			),
		},
	]

	return (
		<div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
			<div
				className='content d-flex flex-column flex-column-fluid'
				id='kt_content'
			>
				<div id='kt_content_container' className='container-xxl'>
					<Announcement />
					<div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
						<div className='col-xl-4'>
							<div className='card h-lg-100'>
								<div className='card-body'>
									{currentUser?.studentName && (
										<>
											<div className='card-px text-center pt-15 pb-15'>
												<h2 className='text-gray-400 fs-4 fw-semibold py-7'>
													Hello <MdCelebration />
												</h2>
												{/* <div className='text-center pb-15 px-5'>
													<img
														src={currentUser?.studentPfp}
														alt={currentUser?.studentName}
														className='mw-100 h-200px h-sm-325px'
													/>
												</div> */}
												<h3 className='fs-2x fw-bold mb-0'>
													{currentUser.studentName}!
												</h3>
											</div>
										</>
									)}
									{currentUser?.parentName && (
										<>
											<div className='card-px text-center pt-15 pb-15'>
												<h2 className='text-gray-400 fs-4 fw-semibold py-7'>
													Hello <MdCelebration />
												</h2>
												{/* <div className='text-center pb-15 px-5'>
													<img
														src={currentUser?.parentPfp}
														alt={currentUser?.parentName}
														className='mw-100 h-200px h-sm-325px'
													/>
												</div> */}
												<h3 className='fs-2x fw-bold mb-0'>
													{currentUser.parentName}!
												</h3>
											</div>
										</>
									)}
									{currentUser?.teacherName && (
										<>
											<div className='card-px text-center pt-15 pb-15'>
												<h2 className='text-gray-400 fs-4 fw-semibold py-7'>
													Hello <MdCelebration />
												</h2>
												{/* <div className='text-center pb-15 px-5'>
													<img
														src={currentUser?.teacherPfp}
														alt={currentUser?.teacherName}
														className='mw-100 h-200px h-sm-325px'
													/>
												</div> */}
												<h3 className='fs-2x fw-bold mb-0'>
													{currentUser.teacherName}!
												</h3>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						<div className='col-xl-8'>
							<div className='card h-lg-100'>
								<div className='card-body'>
									<div className='card-px text-center pt-15 pb-15'>
										<Calendar />
									</div>
								</div>
							</div>
						</div>
					</div>
					<Tabs tabs={tabs} />
					<Accords />
					{/*delete modal*/}
					{showDeleteModal ? (
						<div className='modal fade' tabIndex='-1' id='remove-book'>
							<div className='modal-dialog modal-dialog-centered'>
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
										<div className='modal-body'>
											<p className='txt-danger'>
												Are you sure you want to remove the book below?
											</p>
											<div className='form-row'>
												<div className='form-label'>Student Id</div>
												<input
													type='text'
													className='input-field'
													onChange={handleChange}
													value={inputs.studentId}
													name='name'
													disabled
												/>
											</div>
											<div className='form-row'>
												<div className='form-label'>Parent Id</div>
												<input
													type='text'
													className='input-field'
													onChange={handleChange}
													value={inputs.parentId}
													name='name'
													disabled
												/>
											</div>
											<div className='form-row'>
												<div className='form-label'>Teacher Id</div>
												<input
													type='text'
													className='input-field'
													onChange={handleChange}
													value={inputs.teacherId}
													name='name'
													disabled
												/>
											</div>
											<div className='form-row'>
												<div className='form-label'>Book ISBN</div>
												<input
													type='text'
													className='input-field'
													value={inputs.isbn}
													name='isbn'
													disabled
												/>
											</div>
											{err && <p className='txt-danger'>{err}</p>}
											{successMsg && (
												<p className='txt-success'>{successMsg}</p>
											)}
										</div>
										<div className='modal-footer'>
											<button
												className='btn btn-sm btn-danger outline'
												onClick={() => {
													handleCancelEdit()
													setShowDeleteModal(false)
												}}
											>
												No, cancel
											</button>
											<button
												className='btn btn-sm btn-danger'
												onClick={handleDelete}
											>
												Yes, remove
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default Home
