import React, { useState } from 'react'

const Accordion = ({ title, content }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleAccordion = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className='accordion-item'>
			<div className='accordion-header' id='kt_accordion_1_header_1'>
				<button
					className={`accordion-button fs-4 fw-semibold ${
						isOpen ? '' : 'collapsed'
					}`}
					type='button'
					onClick={toggleAccordion}
				>
					{title}
				</button>
			</div>
			{isOpen && (
				<div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
					<div className='accordion-body'>{content}</div>
				</div>
			)}
		</div>
	)
}

export default Accordion
