import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import Toolbar from '../layout/Toolbar'

const Videos = () => {
	const pageTitle = 'Videos Management'
	const pageDescription = 'List of Videos'
	const [videos, setVideos] = useState({})

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/books/get-videos`
				)

				const data = res.data

				setVideos(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchVideos()
	})

	const [showEditModal, setShowEditModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selected, setSelected] = useState(null)
	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const [inputs, setInputs] = useState({
		title: selected ? selected.title : '',
		link: selected ? selected.link : '',
	})

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
							<div className='card-title'>List of Videos</div>
						</div>
						<div className='card-body'>
							{Array.isArray(videos) && videos.length > 0 ? (
								<div className='table-responsive mh-600px scroll-y p-10'>
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
								<p className='text-danger fw-bold fs-3'>No videos yet</p>
							)}
						</div>
					</div>
				</div>
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
											name='title'
											value={inputs.title}
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
											name='link'
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
											name='title'
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
											name='link'
											value={inputs.link}
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

export default Videos
