import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

function BookModal({ setBooks }) {
	const { currentUser } = useContext(AuthContext)
	const [showModal, setShowModal] = useState(false)

	const [inputs, setInputs] = useState({
		isbn: '',
		studentId: null,
		parentId: null,
		teacherId: null,
	})

	useEffect(() => {
		if (currentUser.studentName) {
			setInputs((prevInputs) => ({
				...prevInputs,
				studentId: currentUser.studentId,
				teacherId: null,
				parentId: null,
			}))
		} else if (currentUser.parentName) {
			setInputs((prevInputs) => ({
				...prevInputs,
				parentId: currentUser.parentId,
				studentId: null,
				teacherId: null,
			}))
		} else if (currentUser.teacherName) {
			setInputs((prevInputs) => ({
				...prevInputs,
				teacherId: currentUser.teacherId,
				studentId: null,
				parentId: null,
			}))
		}
	}, [currentUser])

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')
	console.log(inputs)

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/books/add-book', inputs)
			setSuccessMsg('Your book has been added successfully!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.message}`)
			console.log(err)
		}
	}

	return (
		<div>
			<button className='btn right' onClick={() => setShowModal(true)}>
				Add Book
			</button>
			{showModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1>Add more book</h1>
							<p className='right-header' onClick={() => setShowModal(false)}>
								X
							</p>
						</div>
						<div className='modal-body'>
							<p>
								Enter your book barcode number here in the box, then click the
								"Add Book" button.
							</p>
							<input
								className='form-input'
								type={'text'}
								onChange={handleChange}
								placeholder={
									'Enter your 13-digit ISBN number. Ex: 9789672443710'
								}
								name='isbn'
							/>
							{err && <p className='txt-danger'>{err}</p>}
							{successMsg && <p className='txt-success'>{successMsg}</p>}
						</div>
						<div className='modal-footer'>
							<button
								className='danger-btn'
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button className='success-btn' onClick={handleSubmit}>
								Add Book
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default BookModal
