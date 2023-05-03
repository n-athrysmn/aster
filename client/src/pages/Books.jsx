import React, { useEffect, useState } from 'react'
import Tabs from '../components/Tab'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const Books = () => {
	const location = useLocation()

	const bookIsbn = location.pathname.split('/')[2]
	const [videos, setVideos] = useState({})

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				console.log('Fetching videos…')
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/books/answers/${bookIsbn}`
				)
				console.log('Response:', res)
				const data = res.data
				console.log('Data:', data)
				setVideos(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchVideos()
	}, [bookIsbn])

	/*const questions = [
		{
			id: 1,
			title: 'Question 1',
			url: 'https://www.youtube.com/embed/SG_IhpbfDe8',
		},
		{
			id: 2,
			title: 'Question 2',
			url: 'https://www.youtube.com/embed/oftmvDhLtEU',
		},
		{
			id: 3,
			title: 'Question 3',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 4,
			title: 'Question 4',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 5,
			title: 'Question 5',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 6,
			title: 'Question 6',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 7,
			title: 'Question 7',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 8,
			title: 'Question 8',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 9,
			title: 'Question 9',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 10,
			title: 'Question 10',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 11,
			title: 'Question 11',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 12,
			title: 'Question 12',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 13,
			title: 'Question 13',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 14,
			title: 'Question 14',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 15,
			title: 'Question 15',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 16,
			title: 'Question 16',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 17,
			title: 'Question 17',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 18,
			title: 'Question 18',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 19,
			title: 'Question 19',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 20,
			title: 'Question 20',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 21,
			title: 'Question 21',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 22,
			title: 'Question 22',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 23,
			title: 'Question 23',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 24,
			title: 'Question 24',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 25,
			title: 'Question 25',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 26,
			title: 'Question 26',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 27,
			title: 'Question 27',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 28,
			title: 'Question 28',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 29,
			title: 'Question 29',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 30,
			title: 'Question 30',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 31,
			title: 'Question 31',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 32,
			title: 'Question 32',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 33,
			title: 'Question 33',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 34,
			title: 'Question 34',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 35,
			title: 'Question 35',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 36,
			title: 'Question 36',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 37,
			title: 'Question 37',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 38,
			title: 'Question 38',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 39,
			title: 'Question 39',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 40,
			title: 'Question 40',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 41,
			title: 'Question 41',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 42,
			title: 'Question 42',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 43,
			title: 'Question 43',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 44,
			title: 'Question 44',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 45,
			title: 'Question 45',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 46,
			title: 'Question 46',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 47,
			title: 'Question 47',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 48,
			title: 'Question 48',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 49,
			title: 'Question 49',
			url: 'https://www.youtube.com/embed/BQioJUAtk2E',
		},
		{
			id: 50,
			title: 'Question 50',
			url: 'https://www.youtube.com/embed/hEENRcoxkvU',
		},
	]*/

	const [activeQuestionTab1, setActiveQuestionTab1] = useState(1)
	const [activeQuestionTab2, setActiveQuestionTab2] = useState(51)
	const [activeQuestionTab3, setActiveQuestionTab3] = useState(101)
	const [activeQuestionTab4, setActiveQuestionTab4] = useState(151)
	const [activeQuestionTab5, setActiveQuestionTab5] = useState(201)
	const [activeQuestionTab6, setActiveQuestionTab6] = useState(251)
	const [activeQuestionTab7, setActiveQuestionTab7] = useState(301)
	const [activeQuestionTab8, setActiveQuestionTab8] = useState(351)
	const [activeQuestionTab9, setActiveQuestionTab9] = useState(401)
	const [activeQuestionTab10, setActiveQuestionTab10] = useState(451)
	const [activeQuestionTab11, setActiveQuestionTab11] = useState(501)
	const [activeQuestionTab12, setActiveQuestionTab12] = useState(551)

	const QuestionComponent = ({ vids }) => (
		<iframe
			title={vids.title}
			className='videos'
			src={vids.link}
			allowFullScreen={true}
		/>
	)

	const tabs = [
		{
			title: 'Q1-Q50',
			content: (
				<div className='answers'>
					<h2 className='title'>Q1 to Q50</h2>
					{videos.length > 0 ? (
						<div className='answer'>
							{activeQuestionTab1 && (
								<div className='vid'>
									<QuestionComponent
										vids={videos.find((v) => v.id === activeQuestionTab1)}
									/>
								</div>
							)}
							<div className='vid-links'>
								{videos.slice(0, 50).map((v) => {
									console.log(v.id)
									return (
										<div key={v.id} onClick={() => setActiveQuestionTab1(v.id)}>
											<Link
												to={`/books/${bookIsbn}`}
												className={`link ${
													activeQuestionTab1 === v.id ? 'active' : ''
												}`}
											>
												<h3>{v.title}</h3>
											</Link>
										</div>
									)
								})}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q51 - Q100',
			content: (
				<div className='answers'>
					<h2 className='title'>Q51 to Q100</h2>
					{videos.length > 51 ? (
						<div className='answer'>
							{activeQuestionTab2 &&
								videos.find((v) => v.id === activeQuestionTab2) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab2)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab2(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab2 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q101 - Q150',
			content: (
				<div className='answers'>
					<h2 className='title'>Q101 to Q150</h2>
					{videos.length > 101 ? (
						<div className='answer'>
							{activeQuestionTab3 &&
								videos.find((v) => v.id === activeQuestionTab3) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab3)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab3(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab3 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q151 - Q200',
			content: (
				<div className='answers'>
					<h2 className='title'>Q151 to Q200</h2>
					{videos.length > 151 ? (
						<div className='answer'>
							{activeQuestionTab4 &&
								videos.find((v) => v.id === activeQuestionTab4) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab4)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab4(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab4 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q201 - Q250',
			content: (
				<div className='answers'>
					<h2 className='title'>Q201 to Q250</h2>
					{videos.length > 201 ? (
						<div className='answer'>
							{activeQuestionTab5 &&
								videos.find((v) => v.id === activeQuestionTab5) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab5)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab5(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab5 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q251 - Q300',
			content: (
				<div className='answers'>
					<h2 className='title'>Q251 to Q300</h2>
					{videos.length > 251 ? (
						<div className='answer'>
							{activeQuestionTab6 &&
								videos.find((v) => v.id === activeQuestionTab6) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab6)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab6(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab6 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q301 - Q350',
			content: (
				<div className='answers'>
					<h2 className='title'>Q51 to Q100</h2>
					{videos.length > 51 ? (
						<div className='answer'>
							{activeQuestionTab7 &&
								videos.find((v) => v.id === activeQuestionTab7) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab7)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab7(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab7 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q351 - Q400',
			content: (
				<div className='answers'>
					<h2 className='title'>Q351 to Q400</h2>
					{videos.length > 351 ? (
						<div className='answer'>
							{activeQuestionTab8 &&
								videos.find((v) => v.id === activeQuestionTab8) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab8)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab8(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab8 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q401 - Q450',
			content: (
				<div className='answers'>
					<h2 className='title'>Q401 to Q450</h2>
					{videos.length > 401 ? (
						<div className='answer'>
							{activeQuestionTab9 &&
								videos.find((v) => v.id === activeQuestionTab9) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab9)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab9(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab9 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q451 - Q500',
			content: (
				<div className='answers'>
					<h2 className='title'>Q451 to Q500</h2>
					{videos.length > 451 ? (
						<div className='answer'>
							{activeQuestionTab10 &&
								videos.find((v) => v.id === activeQuestionTab10) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab10)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab10(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab10 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q501 - Q550',
			content: (
				<div className='answers'>
					<h2 className='title'>Q501 to Q550</h2>
					{videos.length > 501 ? (
						<div className='answer'>
							{activeQuestionTab11 &&
								videos.find((v) => v.id === activeQuestionTab11) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab11)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab11(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab11 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
		{
			title: 'Q551 - Q600',
			content: (
				<div className='answers'>
					<h2 className='title'>Q551 to Q600</h2>
					{videos.length > 551 ? (
						<div className='answer'>
							{activeQuestionTab12 &&
								videos.find((v) => v.id === activeQuestionTab12) && (
									<div className='vid'>
										<QuestionComponent
											vids={videos.find((v) => v.id === activeQuestionTab12)}
										/>
									</div>
								)}
							<div className='vid-links'>
								{videos.slice(50, 100).map((v) => (
									<div key={v.id} onClick={() => setActiveQuestionTab12(v.id)}>
										<Link
											to={`/books/${bookIsbn}`}
											className={`link ${
												activeQuestionTab12 === v.id ? 'active' : ''
											}`}
										>
											<h3>{v.title}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className='txt-danger'>
							Answers have not been posted, please check from time to time for
							updates!
						</p>
					)}
				</div>
			),
		},
	]

	return (
		<div className='books'>
			<h2>Book Answers</h2>
			<Tabs tabs={tabs} />
		</div>
	)
}

export default Books
