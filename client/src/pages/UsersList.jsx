import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CSVLink } from 'react-csv'
import {
	FaChalkboardTeacher,
	FaFileCsv,
	FaUserGraduate,
	FaUserTie,
} from 'react-icons/fa'
import Toolbar from '../layout/Toolbar'

const UsersList = () => {
	const pageTitle = 'Users List'
	const pageDescription = 'Manage list of users'
	const [showStudents, setShowStudents] = useState(true)
	const [showParents, setShowParents] = useState(false)
	const [showTeachers, setShowTeachers] = useState(false)
	const [activeBtn, setActiveBtn] = useState('students')

	const [students, setStudents] = useState([])
	const [parents, setParents] = useState([])
	const [teachers, setTeachers] = useState([])
	const [csvData, setCsvData] = useState([])

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/students`
				)

				const data = response.data

				setStudents(data)
			} catch (error) {
				console.error(error)
			}
		}

		const fetchParents = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/parents`
				)

				const data = response.data
				setParents(data)
			} catch (error) {
				console.error(error)
			}
		}

		const fetchTeachers = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/teachers`
				)

				const data = response.data
				setTeachers(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchStudents()
		fetchParents()
		fetchTeachers()
	}, [])

	useEffect(() => {
		if (showStudents) {
			setCsvData(students)
		} else if (showParents) {
			setCsvData(parents)
		} else if (showTeachers) {
			setCsvData(teachers)
		}
	}, [showStudents, showParents, showTeachers, students, parents, teachers])

	const handleStudentsClick = () => {
		setShowStudents(true)
		setShowParents(false)
		setShowTeachers(false)
		setActiveBtn('students')
	}

	const handleParentsClick = () => {
		setShowStudents(false)
		setShowParents(true)
		setShowTeachers(false)
		setActiveBtn('parents')
	}

	const handleTeachersClick = () => {
		setShowStudents(false)
		setShowParents(false)
		setShowTeachers(true)
		setActiveBtn('teachers')
	}

	return (
		<>
			<Toolbar pageTitle={pageTitle} pageDescription={pageDescription} />
			<div
				id='kt_content'
				className='content d-flex flex-column flex-column-fluid'
			>
				<div id='kt_content_container' className='container-xxl'>
					<div className='row mb-5'>
						<div className='col-lg-4'>
							<button
								className={
									activeBtn === 'students'
										? 'w-100 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
										: 'w-100 btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
								}
								onClick={handleStudentsClick}
							>
								<FaUserGraduate className='me-10' /> Students List
							</button>
						</div>
						<div className='col-lg-4'>
							<button
								className={
									activeBtn === 'parents'
										? 'w-100 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
										: 'w-100 btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
								}
								onClick={handleParentsClick}
							>
								<FaUserTie className='me-10' /> Parents List
							</button>
						</div>
						<div className='col-lg-4'>
							<button
								className={
									activeBtn === 'teachers'
										? 'w-100 btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
										: 'w-100 btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-5 fs-5'
								}
								onClick={handleTeachersClick}
							>
								<FaChalkboardTeacher className='me-10' /> Teachers List
							</button>
						</div>
					</div>
					{showStudents && (
						<div className='card' id='students'>
							<div className='card-header'>
								<div className='card-title'>List of students</div>
								<div className='card-toolbar'>
									<CSVLink
										data={csvData}
										filename={'student-list.csv'}
										className='btn btn-sm btn-success'
									>
										<FaFileCsv /> Export
									</CSVLink>
								</div>
							</div>
							<div className='card-body'>
								<div className='table-responsive mh-600px scroll-y p-10'>
									<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 text-center'>
										<thead>
											<tr>
												<th className='fs-6 fw-bold'>Id</th>
												<th className='fs-6 fw-bold'>Name</th>
												<th className='fs-6 fw-bold'>Email</th>
												<th className='fs-6 fw-bold'>Phone number</th>
												<th className='fs-6 fw-bold'>Parent Name</th>
												<th className='fs-6 fw-bold'>Parent number</th>
											</tr>
										</thead>
										<tbody>
											{Array.isArray(students) &&
												students.length > 0 &&
												students.map((student) => (
													<tr key={student.studentId}>
														<td>{student.studentId}</td>
														<td>{student.studentName}</td>
														<td>{student.studentEmail}</td>
														<td>{student.studentNumber}</td>
														<td>{student.studentPar}</td>
														<td>{student.studentParNum}</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					)}
					{showParents && (
						<div className='card' id='parents'>
							<div className='card-header'>
								<div className='card-title'>List of parents</div>
								<div className='card-toolbar'>
									<CSVLink
										data={csvData}
										filename={'parents-list.csv'}
										className='btn btn-sm btn-success'
									>
										<FaFileCsv /> Export
									</CSVLink>
								</div>
							</div>
							<div className='card-body'>
								<div className='table-responsive mh-600px scroll-y p-10'>
									<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 text-center'>
										<thead>
											<tr>
												<th className='fs-6 fw-bold'>Id</th>
												<th className='fs-6 fw-bold'>Name</th>
												<th className='fs-6 fw-bold'>Email</th>
												<th className='fs-6 fw-bold'>Phone number</th>
											</tr>
										</thead>
										<tbody>
											{Array.isArray(parents) &&
												parents.length > 0 &&
												parents.map((parent) => (
													<tr key={parent.parentId}>
														<td>{parent.parentId}</td>
														<td>{parent.parentName}</td>
														<td>{parent.parentEmail}</td>
														<td>{parent.parentNumber}</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					)}
					{showTeachers && (
						<div className='card' id='teachers'>
							<div className='card-header'>
								<div className='card-title'>List of teachers</div>
								<div className='card-toolbar'>
									<CSVLink
										data={csvData}
										filename={'teachers-list.csv'}
										className='btn btn-sm btn-success'
									>
										<FaFileCsv /> Export
									</CSVLink>
								</div>
							</div>
							<div className='card-body'>
								<div className='table-responsive mh-600px scroll-y p-10'>
									<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 text-center'>
										<thead>
											<tr>
												<th className='fs-6 fw-bold'>Id</th>
												<th className='fs-6 fw-bold'>Name</th>
												<th className='fs-6 fw-bold'>Email</th>
												<th className='fs-6 fw-bold'>Phone number</th>
											</tr>
										</thead>
										<tbody>
											{Array.isArray(teachers) &&
												teachers.length > 0 &&
												teachers.map((teacher) => (
													<tr key={teacher.teacherId}>
														<td>{teacher.teacherId}</td>
														<td>{teacher.teacherName}</td>
														<td>{teacher.teacherEmail}</td>
														<td>{teacher.teacherNumber}</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default UsersList
