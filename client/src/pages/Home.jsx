import React, { useContext, useState } from 'react'
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

const Home = () => {
	const { currentUser } = useContext(AuthContext)

	const books = [
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
	]

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
									<h1>{book.title}</h1>
								</Link>
								<p>{book.desc}</p>
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
				<div className='posts'>
					{videos.map((video) => (
						<div className='post' key={video.id}>
							<div className='img'>
								<img src={video.img} alt='' />
							</div>
							<div className='content'>
								<Link to={`/books/${video.id}`} className='link'>
									<h1>{video.title}</h1>
								</Link>
								<p>{video.desc}</p>
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
					<h2>
						Hello <MdCelebration />
					</h2>
					<div className='avatar'>
						{/*{currentUser?.studentName && (
            <img src={currentUser?.studentPfp} alt={currentUser?.studentName} />
          )}
          {currentUser?.parentName && (
            <img src={currentUser?.parentPfp} alt={currentUser?.parentName} />
          )}*/}
						<img src={avatar} alt='avatar' />
					</div>
					<div className='info'>
						{currentUser?.studentName && (
							<>
								<div className='tag info-tag'>
									<h3>{currentUser.studentName}!</h3>
								</div>
							</>
						)}
						{currentUser?.parentName && (
							<>
								<div className='tag primary-tag'>
									<h3>{currentUser.parentName}!</h3>
								</div>
							</>
						)}
						{currentUser?.teacherName && (
							<>
								<div className='tag primary-tag'>
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
