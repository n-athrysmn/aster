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
		if (currentUser && currentUser.studentName) {
			setInputs((prevInputs) => ({
				...prevInputs,
				studentId: currentUser.studentId,
				teacherId: null,
				parentId: null,
			}))
		} else if (currentUser && currentUser.parentName) {
			setInputs((prevInputs) => ({
				...prevInputs,
				parentId: currentUser.parentId,
				studentId: null,
				teacherId: null,
			}))
		} else if (currentUser && currentUser.teacherName) {
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
			await axios.post(
				`${process.env.REACT_APP_API_URL}/books/add-book`,
				inputs
			)
			setSuccessMsg('Your book has been added successfully!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	return (
		<>
			<button
				className='btn btn-success w-50'
				onClick={() => setShowModal(true)}
			>
				Add Book
			</button>
			{showModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Add more book</h2>
							<p className='right-header' onClick={() => setShowModal(false)}>
								X
							</p>
						</div>
						<div className='modal-body p-10'>
							<p className='mt-10'>
								Enter your book barcode number here in the box, then click the
								"Add Book" button.
							</p>
							{/* <!--begin::Input group--> */}
							<div class='d-flex flex-column mb-10 fv-row'>
								{/* <!--begin::Label--> */}
								<label class='d-flex align-items-center fs-6 fw-semibold mb-2'>
									<span>13-digits ISBN number</span>
								</label>
								{/* <!--end::Label--> */}
								<input
									type='text'
									class='form-control form-control-solid'
									onChange={handleChange}
									placeholder={'Ex: 978-967-24437-1-0'}
									name='isbn'
								/>
								<div className='form-text text-danger'>
									Do include the dash "-" when entering the ISBN.
								</div>
							</div>
							{/* <!--end::Input group--> */}
							{err && <p className='text-danger'>{err}</p>}
							{successMsg && <p className='text-success'>{successMsg}</p>}
						</div>
						<div className='modal-footer'>
							<button
								className='btn btn-sm btn-danger'
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button className='btn btn-sm btn-success' onClick={handleSubmit}>
								Add Book
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}

export default BookModal
