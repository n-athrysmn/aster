import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import Student from '../components/Student'
import Parent from '../components/Parent'
import Teacher from '../components/Teacher'
import Toolbar from '../layout/Toolbar'

const Profile = () => {
	const { studentId, parentId, teacherId } = useContext(AuthContext).currentUser
	const pageTitle = 'Profile'
	const pageDescription = 'Welcome to the profile page'
	// const pageDescription = `Welcome to the profile page, ${studentId.studentName}`

	return (
		<>
			<Toolbar pageTitle={pageTitle} pageDescription={pageDescription} />
			<div
				id='kt_content'
				className='content d-flex flex-column flex-column-fluid'
			>
				<div id='kt_content_container' className='container-xxl'>
					<div className='card'>
						{/*begin::Card header*/}
						<div className='card-header'>
							{/*begin::Card title*/}
							<div className='card-title m-0'>
								<h3 className='fw-bold m-0'>Profile Details</h3>
							</div>
							{/*end::Card title*/}
						</div>
						{/*end::Card header*/}
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
				</div>
			</div>
		</>
	)
}

export default Profile
