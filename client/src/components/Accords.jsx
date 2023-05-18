import React, { useState } from 'react'
import Accordion from './Accordion'
import { BiSupport } from 'react-icons/bi'
import {
	MdOutlineContactSupport,
	MdOutlineQuestionAnswer,
	MdQuestionAnswer,
} from 'react-icons/md'

const Accords = () => {
	const [faqs] = useState([
		{
			id: 1,
			question: 'I have signed up and logged in, what should I do next?',
			answer:
				'Click on the "Add Book" button on your screen, and fill in the ISBN of your book',
		},
		{
			id: 2,
			question:
				'Why am I getting error [object object] when I tried to add book?',
			answer:
				'It is because you did not use the correct ISBN format, you need to include the "-". For example: 978-967-24437-1-0',
		},
		{
			id: 3,
			question:
				'I have successfully added the book, how can I view the answer?',
			answer:
				'You can click on the "View Answers" button. Alternatively, you can click on the book image or book title.',
		},
		{
			id: 4,
			question:
				'I already clicked on the "View Answers" button, but why I do not see any answer?',
			answer:
				'You need to click on the question number to watch the video. For example: You want to watch the video for question 153. You need to click on the Q151 - Q200, then search for Question 153, then click on it.',
		},
		{
			id: 5,
			question: 'Why I cannot watch some of the videos?',
			answer:
				'Please reach out to us using the live chat. Do remember to state the book title, the book volume, and the question number.',
		},
	])

	return (
		<div className='accords'>
			<Accordion
				title={
					<span>
						<BiSupport /> Support
					</span>
				}
				content={
					<p>
						Click on the chat bubble icon at the bottom right of your screen.
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
						{Array.isArray(faqs) &&
							faqs.map((faq) => (
								<div key={faq.id}>
									<p>
										<MdOutlineQuestionAnswer /> {faq.question}
									</p>
									<p>
										<MdQuestionAnswer /> {faq.answer}
									</p>
									<hr />
								</div>
							))}
						<p className='txt-danger small'>
							Did not find anything that could help you? Chat with us using the
							live chat.
						</p>
					</div>
				}
			/>
		</div>
	)
}

export default Accords
