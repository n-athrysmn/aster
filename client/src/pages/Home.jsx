import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import avatar from '../assets/avatar.png'
import Tabs from '../components/Tab'
import Accordion from '../components/Accordion'
import { BiSupport } from 'react-icons/bi'
import { FaBook, FaChalkboardTeacher } from 'react-icons/fa'
import {
	MdOutlineContactSupport,
	MdWhatsapp,
	MdOutlineQuestionAnswer,
	MdQuestionAnswer,
} from 'react-icons/md'
import Calendar from '../components/Calendar'
import { MdCelebration } from 'react-icons/md'
import Announcement from '../components/Announcements'
import axios from 'axios'

const Home = () => {
	const { currentUser } = useContext(AuthContext)

	const [books, setBooks] = useState([])
	const [videos, setVideos] = useState([])

	let userId

	if (currentUser.studentId) {
		userId = currentUser.studentId
	} else if (currentUser.parentId) {
		userId = currentUser.parentId
	} else if (currentUser.teacherId) {
		userId = currentUser.teacherId
	}

	useEffect(() => {
		async function fetchBooks() {
			try {
				console.log('Fetching books…')
				const response = await axios.get(`/books/get-owned/${userId}`)
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
		async function fetchVideos() {
			try {
				console.log('Fetching videos…')
				const response = await axios.get('/others/get-videos')
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
					{books.map((book) => (
						<div className='post' key={book.id}>
							<div className='img'>
								<img src={book.img} alt='' />
							</div>
							<div className='content'>
								<Link to='/books' className='link'>
									<h2>{book.name}</h2>
								</Link>
								<h3>{book.desc}</h3>
							</div>
						</div>
					))}
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
				<div className='answers row'>
					{videos.map((video) => (
						<div className='answer mb20' key={video.id}>
							<div className='vid mb20'>
								<iframe
									title={video.title}
									className='videos'
									src={video.link}
									allowFullScreen={true}
								/>
							</div>
							<div className='content'>
								<Link to={video.link} className='link'>
									<h3>{video.title}</h3>
								</Link>
							</div>
						</div>
					))}
				</div>
			),
		},
	]

	const [faqs] = useState([
		{
			id: 1,
			question: 'How can I buy the books?',
			answer: 'You can buy our books at any bookstores.',
		},
		{
			id: 2,
			question: 'How long does shipping take?',
			answer:
				'We ship all orders within 1-2 business days. Shipping time varies based on your location.',
		},
		// Add more FAQs here as needed
	])

	return (
		<div className='home'>
			<Announcement />
			<div className='top-part'>
				<div className='profile-card'>
					<div className='avatar'>
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
					</div>
					<div className='info'>
						{currentUser?.studentName && (
							<>
								<div className='tag info-tag'>
									<h2 className='small'>
										Hello <MdCelebration />
									</h2>
									<h3>{currentUser.studentName}!</h3>
								</div>
							</>
						)}
						{currentUser?.parentName && (
							<>
								<div className='tag primary-tag'>
									<h2 className='small'>
										Hello <MdCelebration />
									</h2>
									<h3>{currentUser.parentName}!</h3>
								</div>
							</>
						)}
						{currentUser?.teacherName && (
							<>
								<div className='tag primary-tag'>
									<h2 className='small'>
										Hello <MdCelebration />
									</h2>
									<h3>{currentUser.teacherName}!</h3>
								</div>
							</>
						)}
					</div>
				</div>
				<Calendar />
			</div>
			<Tabs tabs={tabs} isDashboard={true} />
			<div className='accords'>
				<Accordion
					title={
						<span>
							<BiSupport /> Support
						</span>
					}
					content={
						<p>
							Need immediate support?{' '}
							<Link className='link' to='https://wa.me/60192549717'>
								Contact us here <MdWhatsapp />
							</Link>
						</p>
					}
				/>
				<Accordion
					title={
						<span>
							<MdOutlineContactSupport /> FAQ
						</span>
					}
					content={
						<div>
							{faqs.map((faq) => (
								<div key={faq.id}>
									<p>
										<MdOutlineQuestionAnswer /> {faq.question}
									</p>
									<p>
										<MdQuestionAnswer /> {faq.answer}
									</p>
									<hr /> {/* Add a horizontal line separator */}
								</div>
							))}
						</div>
					}
				/>
			</div>
		</div>
	)
}

export default Home
