import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Tabs from '../components/Tab'
import { FaBook, FaChalkboardTeacher } from 'react-icons/fa'
import Calendar from '../components/Calendar'
import { MdCelebration } from 'react-icons/md'
import Announcement from '../components/Announcements'
import axios from 'axios'
import Accords from '../components/Accords'

const Home = () => {
	const { currentUser, isLoggedIn } = useContext(AuthContext)

	const [books, setBooks] = useState([])
	const [videos, setVideos] = useState([])

	const userId =
		currentUser?.studentId || currentUser?.parentId || currentUser?.teacherId

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				console.log('Fetching books…')
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/books/get-owned/${userId}`
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
	}, [userId])

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
				<div className='tab-title'>
					<div className='tab-icon'>
						<FaBook />
					</div>
					Books
				</div>
			),
			content: (
				<div className='posts'>
					{Array.isArray(books) && books.length > 0 ? (
						books.map((book) => (
							<div className='post' key={book.id}>
								<div className='img'>
									<img src={book.img} alt='' />
								</div>
								<div className='content'>
									<Link to={`/books/${book.isbn}`} className='link'>
										<h2>{book.name}</h2>
									</Link>
									<h3>{book.desc}</h3>
								</div>
							</div>
						))
					) : (
						<p className='txt-danger'>
							You have not added any book yet, click the add book button below
							to add your book. If you have not bought any book, please contact
							our marketing team to get your copy.
						</p>
					)}
				</div>
			),
		},
		{
			id: 2,
			title: (
				<div className='tab-title'>
					<div className='tab-icon'>
						<FaChalkboardTeacher />
					</div>
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
		<div className='home'>
			<Announcement />
			<div className='top-part'>
				<div className='profile-card'>
					{/*<div className='avatar'>
						{currentUser?.studentName && (
							<img
								src={currentUser?.studentPfp}
								alt={currentUser?.studentName}
							/>
						)}
						{currentUser?.parentName && (
							<img src={currentUser?.parentPfp} alt={currentUser?.parentName} />
						)}
						{currentUser?.teacherName && (
							<img
								src={currentUser?.teacherPfp}
								alt={currentUser?.teacherName}
							/>
						)}
						</div>*/}
					<div className='info'>
						{currentUser?.studentName && (
							<>
								<div>
									<h2 className='small'>
										Hello <MdCelebration />
									</h2>
									<h3 className='mt20 uppercase'>{currentUser.studentName}!</h3>
								</div>
							</>
						)}
						{currentUser?.parentName && (
							<>
								<div>
									<h2 className='small'>
										Hello <MdCelebration />
									</h2>
									<h3 className='mt20 uppercase'>{currentUser.parentName}!</h3>
								</div>
							</>
						)}
						{currentUser?.teacherName && (
							<>
								<div>
									<h2 className='small'>
										Hello <MdCelebration />
									</h2>
									<h3 className='mt20 uppercase'>{currentUser.teacherName}!</h3>
								</div>
							</>
						)}
					</div>
				</div>
				<Calendar />
			</div>
			<Tabs tabs={tabs} isDashboard={true} />
			<Accords />
		</div>
	)
}

export default Home
