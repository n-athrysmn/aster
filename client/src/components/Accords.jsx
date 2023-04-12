import React, { useState } from 'react'
import Accordion from './Accordion'
import { BiSupport } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import {
	MdOutlineContactSupport,
	MdOutlineQuestionAnswer,
	MdQuestionAnswer,
	MdWhatsapp,
} from 'react-icons/md'

const Accords = () => {
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
								<hr />
							</div>
						))}
					</div>
				}
			/>
		</div>
	)
}

export default Accords
