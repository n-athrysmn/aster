import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Toolbar from '../layout/Toolbar'

const Event = () => {
	const pageTitle = 'Events Management'
	const pageDescription = 'List of Events'
	const { currentAdmin, isLoggedIn } = useContext(AuthContext)
	const [events, setEvents] = useState([])

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/others/get-events`
				)

				const data = response.data

				setEvents(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchEvents()
	}, [])

	const [showEditModal, setShowEditModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedEvent, setSelectedEvent] = useState(null)

	const [inputs, setInputs] = useState({
		title: selectedEvent ? selectedEvent.title : '',
		eventdate: selectedEvent ? selectedEvent.eventdate : '',
	})

	useEffect(() => {
		if (selectedEvent) {
			setInputs({
				title: selectedEvent.title,
				eventdate: selectedEvent.eventdate,
			})
		}
	}, [selectedEvent])

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/others/edit-event/${selectedEvent.id}`,
				inputs
			)
			setSuccessMsg('Your event has been updated successfully!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
		}
	}

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const handleDelete = async () => {
		try {
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/others/delete-event/${selectedEvent.id}`
			)
			setSuccessMsg('Your event has been deleted successfully!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			setTimeout(() => {
				setError('')
				window.location.reload()
			}, 3000)
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
							<div className='card-title'>List of Events</div>
						</div>
						<div className='card-body'>
							<div className='table-responsive mh-500px scroll-y'>
								<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 text-center'>
									<thead>
										<tr>
											<th className='fs-6 fw-bold'>Id</th>
											<th className='fs-6 fw-bold'>Title</th>
											<th className='fs-6 fw-bold'>Date</th>
											<th className='fs-6 fw-bold'>Actions</th>
										</tr>
									</thead>
									<tbody>
										{Array.isArray(events) &&
											events.length > 0 &&
											events.map((event) => {
												const date = new Date(event.date)
												const formattedDate = date
													.toLocaleDateString('en-GB', {
														day: 'numeric',
														month: 'numeric',
														year: 'numeric',
													})
													.replace(/\//g, '/')
												return (
													<tr key={event.id}>
														<td>{event.id}</td>
														<td>{event.title}</td>
														<td>{formattedDate}</td>
														<td>
															<button
																className='btn btn-icon btn-warning btn-sm me-1'
																onClick={() => {
																	setSelectedEvent(event)
																	setShowEditModal(true)
																}}
																title='Edit'
															>
																<FaEdit />
															</button>
															<button
																className='btn btn-icon btn-danger btn-sm me-1'
																onClick={() => {
																	setSelectedEvent(event)
																	setShowDeleteModal(true)
																}}
																title='Delete'
															>
																<FaTrash />
															</button>
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
			</div>
			{showEditModal ? (
				<div className='modal' id='editModal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Edit event</h2>
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
										Title
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
								{/* end::Input group*/}
								{/*begin::Input group*/}
								<div className='d-flex flex-column mb-8 fv-row'>
									{/*begin::Label*/}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										Date
									</label>
									{/*end::Label*/}
									<input
										type={'date'}
										onChange={handleChange}
										name='eventdate'
										value={inputs.eventdate}
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
									onClick={() => setShowEditModal(false)}
								>
									Cancel
								</button>
								<button
									className='btn btn-sm btn-success'
									onClick={handleSubmit}
								>
									Edit event
								</button>
							</div>
						</form>
					</div>
				</div>
			) : null}
			{showDeleteModal ? (
				<div className='modal' id='deleteModal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Delete event</h2>
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
									Are you sure you want to delete the event below?
								</p>
								{/*begin::Input group*/}
								<div className='d-flex flex-column mb-8 fv-row'>
									{/*begin::Label*/}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										Title
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
										Date
									</label>
									{/*end::Label*/}
									<input
										type={'date'}
										onChange={handleChange}
										name='date'
										value={inputs.eventdate}
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
									onClick={() => setShowDeleteModal(false)}
								>
									No, cancel
								</button>
								<button
									className='btn btn-sm btn-success'
									onClick={handleDelete}
								>
									Yes, proceed
								</button>
							</div>
						</form>
					</div>
				</div>
			) : null}
		</>
	)
}

export default Event
