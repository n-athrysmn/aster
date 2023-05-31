import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import Toolbar from '../layout/Toolbar'

const Announce = () => {
	const pageTitle = 'Announcements Management'
	const pageDescription = 'List of Announcements'
	const { currentAdmin, isLoggedIn } = useContext(AuthContext)
	const [announcements, setAnnouncements] = useState([])

	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				console.log('Fetching announcements…')
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/others/announce`
				)
				console.log('Response:', response)
				const data = response.data
				console.log('Data:', data)
				setAnnouncements(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchAnnouncements()
	}, [])

	const [showEditModal, setShowEditModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selected, setSelected] = useState(null)

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const [inputs, setInputs] = useState({
		title: selected ? selected.title : '',
		announcement: selected ? selected.announcement : '',
	})

	useEffect(() => {
		if (selected) {
			setInputs({
				title: selected.title,
				announcement: selected.announcement,
			})
		}
	}, [selected])

	const handleCancelEdit = () => {
		setShowEditModal(false)
		setInputs({
			title: selected.title,
			announce: selected.announce,
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
				`${process.env.REACT_APP_API_URL}/others/edit-announce/${selected.id}`,
				inputs
			)
			setSuccessMsg('The announcement has been edited successfully!')
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
				`${process.env.REACT_APP_API_URL}/others/delete-announce/${selected.id}`
			)
			setSuccessMsg('The announcement has been deleted successfully!')
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
							<div className='card-title'>List of Announcements</div>
						</div>
						<div className='card-body'>
							<div className='table-responsive mh-600px scroll-y p-10'>
								<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 text-center'>
									<thead>
										<tr>
											<th className='fs-6 fw-bold'>Title</th>
											<th className='fs-6 fw-bold'>Announcement</th>
											<th className='fs-6 fw-bold'>Date Created</th>
											<th className='fs-6 fw-bold'>Actions</th>
										</tr>
									</thead>
									<tbody>
										{Array.isArray(announcements) &&
											announcements.length > 0 &&
											announcements.map((announcement) => {
												const date = new Date(announcement.createdAt)
												const formattedDate = date
													.toLocaleDateString('en-GB', {
														day: 'numeric',
														month: 'numeric',
														year: 'numeric',
													})
													.replace(/\//g, '/')
												return (
													<tr key={announcement.id}>
														<td>{announcement.title}</td>
														<td>{announcement.announcement}</td>
														<td>{formattedDate}</td>
														<td>
															<div className='row'>
																<div className='col-md-6'>
																	<button
																		className='btn btn-icon btn-warning btn-sm me-1'
																		onClick={() => {
																			setSelected(announcement)
																			setShowEditModal(true)
																		}}
																		title='Edit'
																	>
																		<FaEdit />
																	</button>
																</div>
																<div className='col-md-6'>
																	<button
																		className='btn btn-icon btn-danger btn-sm me-1'
																		onClick={() => {
																			setSelected(announcement)
																			setShowDeleteModal(true)
																		}}
																		title='Delete'
																	>
																		<FaTrash />
																	</button>
																</div>
															</div>
														</td>
													</tr>
												)
											})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				{/*edit modal*/}
				{showEditModal ? (
					<div className='modal'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h2>Edit announcement</h2>
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
											Announcement Title
										</label>
										{/*end::Label*/}
										<input
											type={'text'}
											onChange={handleChange}
											name='vidTitle'
											value={inputs.title}
											className='form-control form-control-lg form-control-solid'
										/>
										<div className='form-text text-primary'>
											Other users won't be able to see this, this is for admin
											only.
										</div>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Announcement Content
										</label>
										{/*end::Label*/}
										<textarea
											onChange={handleChange}
											value={inputs.announcement}
											name='announcement'
											className='form-control form-control-lg form-control-solid'
											rows='4'
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
										Edit
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
								<h2>Delete announcement</h2>
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
										Are you sure you want to delete the announcement below?
									</p>
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Announcement Title
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
										<div className='form-text text-primary'>
											Other users won't be able to see this, this is for admin
											only.
										</div>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Announcement Content
										</label>
										{/*end::Label*/}
										<textarea
											onChange={handleChange}
											value={inputs.announcement}
											name='announcement'
											disabled
											className='form-control form-control-lg form-control-solid'
											rows='4'
										/>
									</div>
									{/*end::Input group*/}
									{err && <p className='text-danger'>{err}</p>}
									{successMsg && <p className='text-success'>{successMsg}</p>}
								</div>
								<div className='modal-footer'>
									<button
										className='btn btn-sm btn-light-danger'
										onClick={() => setShowDeleteModal(false)}
									>
										No, cancel
									</button>
									<button
										className='btn btn-sm btn-danger'
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

export default Announce
