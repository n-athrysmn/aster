import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import Toolbar from '../layout/Toolbar'

const BookDetails = () => {
	const pageTitle = 'Books Management'
	const pageDescription = 'List of Answers'
	const location = useLocation()

	const bookId = location.pathname.split('/')[2]
	const [videos, setVideos] = useState({})

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				console.log('Fetching book details…')
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/books/details/${bookId}`
				)
				console.log('Response:', res)
				const data = res.data
				console.log('Data:', data)
				setVideos(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchBooks()
	}, [bookId])

	const [showAddModal, setShowAddModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selected, setSelected] = useState(null)

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const [inputs, setInputs] = useState({
		title: selected ? selected.title : '',
		link: selected ? selected.link : '',
		vidTitle: '',
		vidUrl: '',
		book: bookId,
	})

	console.log(inputs)

	useEffect(() => {
		if (selected) {
			setInputs({
				title: selected.title,
				link: selected.link,
			})
		}
	}, [selected])

	const handleCancelEdit = () => {
		setShowEditModal(false)
		setInputs({
			title: selected.title,
			link: selected.link,
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
			await axios.post(`${process.env.REACT_APP_API_URL}/others/upload`, inputs)
			setSuccessMsg('Video has been uploaded!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const handleEdit = async (e) => {
		e.preventDefault()
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/books/edit-video/${selected.id}`,
				inputs
			)
			setSuccessMsg('The video has been edited successfully!')
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
				`${process.env.REACT_APP_API_URL}/books/delete-video/${selected.id}`
			)
			setSuccessMsg('The video has been deleted successfully!')
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
			<Toolbar pageTitle={pageTitle} pageDescription={pageDescription} />
			<div
				id='kt_content'
				className='content d-flex flex-column flex-column-fluid'
			>
				<div id='kt_content_container' className='container-xxl'>
					<div className='card'>
						<div className='card-header'>
							<div className='card-title'>List of Answers</div>
							<div className='card-toolbar'>
								<button
									className='btn btn-sm btn-primary'
									onClick={() => setShowAddModal(true)}
								>
									Add Answer <FaPlus />
								</button>
							</div>
						</div>
						<div className='card-body'>
							{Array.isArray(videos) && videos.length > 0 ? (
								<div className='table-responsive mh-600px scroll-y'>
									<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 text-center'>
										<thead>
											<tr>
												<th className='fs-6 fw-bold'>Title</th>
												<th className='fs-6 fw-bold'>Link</th>
												<th className='fs-6 fw-bold'>Actions</th>
											</tr>
										</thead>
										<tbody>
											{videos.map((video) => (
												<tr key={video.id}>
													<td>{video.title}</td>
													<td>{video.link}</td>
													<td>
														<div className='row'>
															<div className='col-md-4'>
																<a
																	href={video.link}
																	className='btn btn-icon btn-success btn-sm me-1'
																	target='_blank'
																	rel='noopener noreferrer'
																>
																	<FaEye />
																</a>
															</div>
															<div className='col-md-4'>
																<button
																	className='btn btn-icon btn-warning btn-sm me-1'
																	onClick={() => {
																		setSelected(video)
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
																		setSelected(video)
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
							) : (
								<p className='text-danger'>No answers uploaded for this book</p>
							)}
						</div>
					</div>
				</div>
				{/*add modal*/}
				{showAddModal ? (
					<div className='modal'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h2>Add Book Answer</h2>
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
											Video Title
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='vidTitle'
											placeholder='Ex: Question 1'
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Video URL
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='vidUrl'
											placeholder='Enter video ID here'
											className='form-control form-control-lg form-control-solid'
										/>
										<div className='form-text text-primary'>
											You can get the video ID from the link in the URL bar of
											your browser. Eg: https://www.youtube.com/watch?v=
											<span className='text-danger'>video-id-here</span>
											&ab_channel
										</div>
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
										Add Answer
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
								<h2>Edit video</h2>
								<p
									className='right-header'
									onClick={() => {
										handleCancelEdit()
										setShowEditModal(false)
									}}
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
											Video Title
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='vidTitle'
											value={inputs.title}
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Video Title
										</label>
										{/*end::Label*/}
										<input
											type={'url'}
											onChange={handleChange}
											name='vidUrl'
											value={inputs.link}
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
										Update
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
								<h2>Delete video</h2>
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
										Are you sure you want to delete the video below?
									</p>
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Video Title
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='vidTitle'
											value={inputs.title}
											disabled
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Video Title
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='vidUrl'
											value={inputs.link}
											disabled
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

export default BookDetails
