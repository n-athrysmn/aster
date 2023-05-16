import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import Student from '../components/Student'
import Parent from '../components/Parent'
import Teacher from '../components/Teacher'

const Profile = () => {
	const { studentId, parentId, teacherId } = useContext(AuthContext).currentUser

	return (
		<div class='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
			<div id='kt_content_container' class='container-xxl'>
				<div class='card mb-5 mb-xl-10'>
					{/*begin::Card header*/}
					<div
						class='card-header border-0 cursor-pointer'
						role='button'
						data-bs-toggle='collapse'
						data-bs-target='#kt_account_profile_details'
						aria-expanded='true'
						aria-controls='kt_account_profile_details'
					>
						{/*begin::Card title*/}
						<div class='card-title m-0'>
							<h3 class='fw-bold m-0'>Profile Details</h3>
						</div>
						{/*end::Card title*/}
					</div>
					{/*begin::Card header*/}
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
	)
}

export default Profile
