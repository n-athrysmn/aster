import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { CSVLink } from 'react-csv'
import {
	FaChalkboardTeacher,
	FaFileCsv,
	FaUserGraduate,
	FaUserTie,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const UsersList = () => {
	const { currentAdmin, isLoggedIn } = useContext(AuthContext)
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
				console.log('Fetching students…')
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/students`
				)
				console.log('Response:', response)
				const data = response.data
				console.log('Student:', data)
				setStudents(data)
			} catch (error) {
				console.error(error)
			}
		}

		const fetchParents = async () => {
			try {
				console.log('Fetching parents…')
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/parents`
				)
				console.log('Response:', response)
				const data = response.data
				console.log('Parent:', data)
				setParents(data)
			} catch (error) {
				console.error(error)
			}
		}

		const fetchTeachers = async () => {
			try {
				console.log('Fetching teachers…')
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/teachers`
				)
				console.log('Response:', response)
				const data = response.data
				console.log('Teacher:', data)
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

	const navigate = useNavigate()

	if (!isLoggedIn || !currentAdmin) {
		return navigate('/admin')
	}

	return (
		<div className='home'>
			<div className='row center'>
				<button
					className={
						activeBtn === 'students' ? 'toggle-btn active' : 'toggle-btn'
					}
					onClick={handleStudentsClick}
				>
					<FaUserGraduate /> Students List
				</button>
				<button
					className={
						activeBtn === 'parents' ? 'toggle-btn active' : 'toggle-btn'
					}
					onClick={handleParentsClick}
				>
					<FaUserTie /> Parents List
				</button>
				<button
					className={
						activeBtn === 'teachers' ? 'toggle-btn active' : 'toggle-btn'
					}
					onClick={handleTeachersClick}
				>
					<FaChalkboardTeacher /> Teachers List
				</button>
			</div>
			{showStudents && (
				<div className='card' id='students'>
					<div className='card-header'>
						<div className='card-title'>List of students</div>
						<div className='card-tools'>
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
						<table className='tables'>
							<thead>
								<tr>
									<th>Id</th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone number</th>
									<th>Parent Name</th>
									<th>Parent number</th>
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
			)}
			{showParents && (
				<div className='card' id='parents'>
					<div className='card-header'>
						<div className='card-title'>List of parents</div>
						<div className='card-tools'>
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
						<table className='tables'>
							<thead>
								<tr>
									<th>Id</th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone number</th>
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
			)}
			{showTeachers && (
				<div className='card' id='teachers'>
					<div className='card-header'>
						<div className='card-title'>List of teachers</div>
						<div className='card-tools'>
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
						<table className='tables'>
							<thead>
								<tr>
									<th>Id</th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone number</th>
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
			)}
		</div>
	)
}

export default UsersList
