import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import Student from '../components/Student'
import Parent from '../components/Parent'
import Teacher from '../components/Teacher'

const Profile = () => {
	const { studentId, parentId, teacherId } = useContext(AuthContext).currentUser

	return (
		<div className='profile'>
			<h2>Profile</h2>
			{studentId && (
				<>
					<Student />
				</>
			)}
			{parentId && (
				<>
					<Parent />
				</>
			)}
			{teacherId && (
				<>
					<Teacher />
				</>
			)}
		</div>
	)
}

export default Profile
