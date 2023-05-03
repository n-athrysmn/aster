import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AdminBook = () => {
	const [books, setBooks] = useState([])

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				console.log('Fetching books…')
				const response = await axios.post(
					`${process.env.REACT_APP_API_URL}/books/get-books`
				)
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

	const [showAddModal, setShowAddModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState(null)

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const [inputs, setInputs] = useState({
		name: selectedBook ? selectedBook.name : '',
		img: selectedBook ? selectedBook.img : '',
		desc: selectedBook ? selectedBook.desc : '',
		isbn: selectedBook ? selectedBook.isbn : '',
	})

	useEffect(() => {
		if (selectedBook) {
			setInputs({
				name: selectedBook.name,
				img: selectedBook.img,
				desc: selectedBook.desc,
				isbn: selectedBook.isbn,
			})
		}
	}, [selectedBook])

	const handleCancelEdit = () => {
		setShowEditModal(false)
		setInputs({
			name: selectedBook.name,
			img: selectedBook.img,
			desc: selectedBook.desc,
			isbn: selectedBook.isbn,
		})
	}

	const [formChanged, setFormChanged] = useState(false)

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
		setFormChanged(true)
	}

	const handleAdd = async (e) => {
		e.preventDefault()
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/books/add`, inputs)
			setSuccessMsg('Your book has been added successfully!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
			setTimeout(() => {
				window.location.reload()
			}, 3000)
		}
	}

	const handleEdit = async (e) => {
		e.preventDefault()
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/books/edit/${selectedBook.id}`,
				inputs
			)
			setSuccessMsg('The book has been edited successfully!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const handleDelete = async () => {
		try {
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/books/delete/${selectedBook.id}`
			)
			setSuccessMsg('The book has been deleted successfully!')
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
		<div className='home'>
			<div className='card'>
				<div className='card-header'>
					<div className='card-title'>List of book</div>
					<div className='card-tools'>
						<button
							className='btn btn-sm btn-primary'
							onClick={() => setShowAddModal(true)}
						>
							Add book <FaPlus />
						</button>
					</div>
				</div>
				<div className='card-body'>
					<table className='tables'>
						<thead>
							<tr>
								<th>Id</th>
								<th>Image</th>
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
										<td>
											<a href={book.img} target='_blank' rel='noreferrer'>
												<img className='tbl-img' src={book.img} alt='' />
											</a>
										</td>
										<td>{book.name}</td>
										<td>{book.desc}</td>
										<td>{book.isbn}</td>
										<td>
											<div className='row'>
												<Link
													to={`/book-details/${book.id}`}
													className='btn btn-sm btn-success'
												>
													<FaEye />
												</Link>
												<button
													className='btn btn-sm btn-warning'
													onClick={() => {
														setSelectedBook(book)
														setShowEditModal(true)
													}}
												>
													<FaEdit />
												</button>
												<button
													className='btn btn-sm btn-danger'
													onClick={() => {
														setSelectedBook(book)
														setShowDeleteModal(true)
													}}
												>
													<FaTrash />
												</button>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			{/*add modal*/}
			{showAddModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Add book</h2>
							<p
								className='right-header'
								onClick={() => setShowAddModal(false)}
							>
								X
							</p>
						</div>
						<form className='form-control'>
							<div className='modal-body'>
								<div className='form-row'>
									<div className='form-label'>Book Name</div>
									<input
										type='text'
										className='input-field'
										onChange={handleChange}
										name='name'
									/>
								</div>
								{/*<div className='form-row'>
									<div className='form-label'>Book Image</div>
									<input
										type='file'
										className='input-field'
										onChange={handleChange}
										name='img'
									/>
			</div>*/}
								<div className='form-row'>
									<div className='form-label'>Book Description</div>
									<input
										type='text'
										className='input-field'
										onChange={handleChange}
										name='desc'
									/>
								</div>
								<div className='form-row'>
									<div className='form-label'>Book ISBN</div>
									<input
										type='text'
										className='input-field'
										onChange={handleChange}
										name='isbn'
									/>
								</div>
								{err && <p className='txt-danger'>{err}</p>}
								{successMsg && <p className='txt-success'>{successMsg}</p>}
							</div>
							<div className='modal-footer'>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => setShowAddModal(false)}
								>
									Cancel
								</button>
								<button className='btn btn-sm btn-success' onClick={handleAdd}>
									Add Book
								</button>
							</div>
						</form>
					</div>
				</div>
			) : null}
			{/*edit modal*/}
			{showEditModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Edit book</h2>
							<p
								className='right-header'
								onClick={() => setShowEditModal(false)}
							>
								X
							</p>
						</div>
						<form className='form-control'>
							<div className='modal-body'>
								<div className='form-row'>
									<div className='form-label'>Book Name</div>
									<input
										type='text'
										className='input-field'
										onChange={handleChange}
										value={inputs.name}
										name='name'
									/>
								</div>
								<div className='form-row'>
									<div className='form-label'>Book Image</div>
									<input
										type='url'
										className='input-field'
										onChange={handleChange}
										value={inputs.img}
										name='img'
									/>
								</div>
								<div className='form-row'>
									<div className='form-label'>Book Description</div>
									<input
										type='text'
										className='input-field'
										onChange={handleChange}
										value={inputs.desc}
										name='desc'
									/>
								</div>
								<div className='form-row'>
									<div className='form-label'>Book ISBN</div>
									<input
										type='text'
										className='input-field'
										onChange={handleChange}
										value={inputs.isbn}
										name='isbn'
									/>
								</div>
								{err && <p className='txt-danger'>{err}</p>}
								{successMsg && <p className='txt-success'>{successMsg}</p>}
							</div>
							<div className='modal-footer'>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => {
										handleCancelEdit()
										setShowEditModal(false)
									}}
								>
									Cancel
								</button>
								<button
									className='btn btn-sm btn-success'
									onClick={handleEdit}
									disabled={!formChanged}
								>
									Edit book
								</button>
							</div>
						</form>
					</div>
				</div>
			) : null}
			{/*delete modal*/}
			{showDeleteModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Delete book</h2>
							<p
								className='right-header'
								onClick={() => setShowDeleteModal(false)}
							>
								X
							</p>
						</div>
						<form className='form-control'>
							<div className='modal-body'>
								<p className='txt-danger'>
									Are you sure you want to delete the book below?
								</p>
								<div className='form-row'>
									<div className='form-label'>Book Name</div>
									<input
										type='text'
										className='input-field'
										onChange={handleChange}
										value={inputs.name}
										name='name'
										disabled
									/>
								</div>
								<div className='form-row'>
									<div className='form-label'>Book Image</div>
									<input
										type='url'
										className='input-field'
										onChange={handleChange}
										value={inputs.img}
										name='img'
										disabled
									/>
								</div>
								<div className='form-row'>
									<div className='form-label'>Book Description</div>
									<input
										type='text'
										className='input-field'
										value={inputs.desc}
										name='desc'
										disabled
									/>
								</div>
								<div className='form-row'>
									<div className='form-label'>Book ISBN</div>
									<input
										type='text'
										className='input-field'
										value={inputs.isbn}
										name='isbn'
										disabled
									/>
								</div>
								{err && <p className='txt-danger'>{err}</p>}
								{successMsg && <p className='txt-success'>{successMsg}</p>}
							</div>
							<div className='modal-footer'>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => {
										handleCancelEdit()
										setShowDeleteModal(false)
									}}
								>
									No, cancel
								</button>
								<button
									className='btn btn-sm btn-success'
									onClick={handleDelete}
								>
									Yes, delete
								</button>
							</div>
						</form>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default AdminBook
