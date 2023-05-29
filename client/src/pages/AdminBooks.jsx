import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Toolbar from '../layout/Toolbar'

const AdminBook = () => {
	const pageTitle = 'Books Management'
	const pageDescription = 'List of Books'
	const { currentAdmin, isLoggedIn } = useContext(AuthContext)
	const [books, setBooks] = useState([])

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				console.log('Fetching books…')
				const response = await axios.get(
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
		pdf: selectedBook ? selectedBook.pdf : '',
	})

	useEffect(() => {
		if (selectedBook) {
			setInputs({
				name: selectedBook.name,
				img: selectedBook.img,
				desc: selectedBook.desc,
				isbn: selectedBook.isbn,
				pdf: selectedBook.pdf,
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
			pdf: selectedBook.pdf,
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

	const navigate = useNavigate()

	if (!isLoggedIn || !currentAdmin) {
		return navigate('/admin')
	}

	return (
		<>
			<Toolbar pageTitle={pageTitle} pageDescription={pageDescription} />
			<div
				id='kt_content'
				className='content d-flex flex-column flex-column-fluid'
			>
				<div id='kt_content_container' className='container-xxl'>
					<div className='card'>
						<div className='card-header'>
							<div className='card-title'>List of book</div>
							<div className='card-toolbar'>
								<button
									className='btn btn-sm btn-primary'
									onClick={() => setShowAddModal(true)}
								>
									Add book <FaPlus />
								</button>
							</div>
						</div>
						<div className='card-body'>
							<div className='table-responsive mh-500px scroll-y'>
								<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 text-center'>
									<thead>
										<tr>
											<th className='fs-6 fw-bold'>Id</th>
											<th className='fs-6 fw-bold'>Image</th>
											<th className='fs-6 fw-bold'>Name</th>
											<th className='fs-6 fw-bold'>Details</th>
											<th className='fs-6 fw-bold'>Actions</th>
										</tr>
									</thead>
									<tbody>
										{books.length > 0 &&
											books.map((book) => (
												<tr key={book.id}>
													<td>{book.id}</td>
													<td>
														<a href={book.img} target='_blank' rel='noreferrer'>
															<img className='h-100px' src={book.img} alt='' />
														</a>
													</td>
													<td>{book.name}</td>
													<td>
														<p className='mb20'>Description: {book.desc}</p>
														<p className='mb20'>ISBN: {book.isbn}</p>
														<p>
															PDF Answer:{' '}
															<Link
																to={`${book.pdf}`}
																target='_blank'
																className='link'
															>
																Click to view
															</Link>
														</p>
													</td>
													<td>
														<div className='row'>
															<div className='col-md-4'>
																<Link
																	to={`/book-details/${book.id}`}
																	className='btn btn-icon btn-success btn-sm me-1'
																>
																	<FaEye />
																</Link>
															</div>
															<div className='col-md-4'>
																<button
																	className='btn btn-icon btn-warning btn-sm me-1'
																	onClick={() => {
																		setSelectedBook(book)
																		setShowEditModal(true)
																	}}
																>
																	<FaEdit />
																</button>
															</div>
															<div className='col-md-4'>
																<button
																	className='btn btn-icon btn-danger btn-sm me-1'
																	onClick={() => {
																		setSelectedBook(book)
																		setShowDeleteModal(true)
																	}}
																>
																	<FaTrash />
																</button>
															</div>
														</div>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
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
							<form className='form'>
								<div className='modal-body p-10'>
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book Title
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='name'
											placeholder='Enter book title'
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book Image URL
										</label>
										{/*end::Label*/}
										<input
											type={'url'}
											onChange={handleChange}
											name='img'
											placeholder='https://image-url.png'
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book Description
										</label>
										{/*end::Label*/}
										<textarea
											onChange={handleChange}
											name='desc'
											placeholder='Book Volume 1'
											className='form-control form-control-lg form-control-solid'
											rows='3'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book ISBN
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='isbn'
											placeholder='Enter book isbn'
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book PDF Answer Link
										</label>
										{/*end::Label*/}
										<input
											type={'url'}
											onChange={handleChange}
											name='pdf'
											placeholder='https://drive.google.com/pdf-answer/view'
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{err && <p className='text-danger'>{err}</p>}
									{successMsg && <p className='text-success'>{successMsg}</p>}
								</div>
								<div className='modal-footer'>
									<button
										className='btn btn-sm btn-danger'
										onClick={() => setShowAddModal(false)}
									>
										Cancel
									</button>
									<button
										className='btn btn-sm btn-success'
										onClick={handleAdd}
									>
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
							<form className='form'>
								<div className='modal-body p-10'>
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book Title
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='name'
											value={inputs.name}
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book Image URL
										</label>
										{/*end::Label*/}
										<input
											type={'url'}
											onChange={handleChange}
											name='img'
											value={inputs.img}
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book Description
										</label>
										{/*end::Label*/}
										<textarea
											onChange={handleChange}
											name='desc'
											value={inputs.desc}
											className='form-control form-control-lg form-control-solid'
											rows='4'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book ISBN
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='isbn'
											value={inputs.isbn}
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book PDF Answer Link
										</label>
										{/*end::Label*/}
										<input
											type={'url'}
											onChange={handleChange}
											name='pdf'
											value={inputs.pdf}
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{err && <p className='text-danger'>{err}</p>}
									{successMsg && <p className='text-success'>{successMsg}</p>}
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
							<form className='form'>
								<div className='modal-body p-10'>
									<p className='text-danger fw-bold fs-6'>
										Are you sure you want to delete the book below?
									</p>
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book Title
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='name'
											value={inputs.name}
											disabled
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book Image URL
										</label>
										{/*end::Label*/}
										<input
											type={'url'}
											onChange={handleChange}
											name='img'
											value={inputs.img}
											disabled
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book Description
										</label>
										{/*end::Label*/}
										<textarea
											onChange={handleChange}
											name='desc'
											value={inputs.desc}
											disabled
											className='form-control form-control-lg form-control-solid'
											rows='4'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book ISBN
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='isbn'
											value={inputs.isbn}
											disabled
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Book PDF Answer Link
										</label>
										{/*end::Label*/}
										<input
											type={'url'}
											onChange={handleChange}
											name='pdf'
											value={inputs.pdf}
											disabled
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{err && <p className='text-danger'>{err}</p>}
									{successMsg && <p className='text-success'>{successMsg}</p>}
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
		</>
	)
}

export default AdminBook
