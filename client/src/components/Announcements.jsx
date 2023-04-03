import React from 'react'
import { FaBullhorn } from 'react-icons/fa'

const Announcement = () => {
	return (
		<div className='announce mb20'>
			<div className='ann-icon'>
				<div className='icon'>
					<FaBullhorn />
				</div>
			</div>
			<div className='ann-text'>
				Hello everyone, welcome to Aster's dashboard. We will be updating lives
				and quizzes, look forward to it!
			</div>
		</div>
	)
}

export default Announcement
