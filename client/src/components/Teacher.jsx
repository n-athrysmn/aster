import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Teacher = () => {
	const {
		teacherId,
		teacherName,
		teacherEmail,
		teacherNumber,
		teacherSch,
		teacherSalary,
		teacherAddr,
		teacherPfp,
	} = useContext(AuthContext).currentUser

	return (
		<div className='profile-card'>
			<div className='info'>
				<div className='student-info'>
					<h3>teacher Information</h3>
					<p>Name: {teacherName}</p>
					<p>Email: {teacherEmail}</p>
				</div>
			</div>
		</div>
	)
}

export default Teacher
