import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'

const AdminBook = () => {
	const [books, setBooks] = useState([])

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				console.log('Fetching books…')
				const response = await axios.get('/books/get-books')
				console.log('Response:', response)
				const data = response.data
				console.log('Data:', data)
				setBooks(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchBooks()
	}, [])

	const [showModal, setShowModal] = useState(false)

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const [inputs, setInputs] = useState({
		isbn: '',
		studentId: null,
		parentId: null,
		teacherId: null,
	})

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

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
		<div className='home'>
			<div className='card' id='students'>
				<div className='card-title'>List of book</div>
				<div className='card-body'>
					<table className='userTable'>
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Description</th>
								<th>ISBN</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{books.length > 0 &&
								books.map((book) => (
									<tr key={book.id}>
										<td>{book.id}</td>
										<td>{book.name}</td>
										<td>{book.desc}</td>
										<td>{book.isbn}</td>
										<td>
											<div className='row'>
												<button className='btn btn-success'>
													<FaEye /> View
												</button>
												<button
													className='btn btn-primary'
													onClick={() => setShowModal(true)}
												>
													<FaEdit /> Edit
												</button>
												<button className='btn btn-danger'>
													<FaTrash /> Delete
												</button>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			{showModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Edit book</h2>
							<p className='right-header' onClick={() => setShowModal(false)}>
								X
							</p>
						</div>
						<div className='modal-body'>
							{err && <p className='txt-danger'>{err}</p>}
							{successMsg && <p className='txt-success'>{successMsg}</p>}
						</div>
						<div className='modal-footer'>
							<button
								className='btn-danger'
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button className='btn-success' onClick={handleSubmit}>
								Add Book
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default AdminBook
