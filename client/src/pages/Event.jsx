import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Event = () => {
	const [events, setEvents] = useState([])

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				console.log('Fetching events…')
				const response = await axios.get('/others/get-events')
				console.log('Response:', response)
				const data = response.data
				console.log('Data:', data)
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
		date: selectedEvent ? selectedEvent.date : '',
	})

	const date = new Date(inputs.date)
	const newDate = date
		.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		})
		.replace(/\//g, '/')

	useEffect(() => {
		if (selectedEvent) {
			setInputs({
				title: selectedEvent.title,
				date: selectedEvent.date,
			})
		}
	}, [selectedEvent])

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.put(`/others/edit-event/${selectedEvent.id}`, inputs)
			setSuccessMsg('Your event has been updated successfully!')
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	const handleDelete = async () => {
		try {
			await axios.delete(`/others/delete-event/${selectedEvent.id}`)
			setSuccessMsg('Your event has been deleted successfully!')
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
			<div className='card' id='students'>
				<div className='card-header'>
					<div className='card-title'>List of Events</div>
				</div>
				<div className='card-body'>
					<table className='tables'>
						<thead>
							<tr>
								<th>Id</th>
								<th>Title</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{events.length > 0 &&
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
												<div className='row'>
													<button
														className='btn btn-primary'
														onClick={() => {
															setSelectedEvent(event)
															setShowEditModal(true)
														}}
													>
														<FaEdit /> Edit
													</button>
													<button
														className='btn btn-danger'
														onClick={() => {
															setSelectedEvent(event)
															setShowDeleteModal(true)
														}}
													>
														<FaTrash /> Delete
													</button>
												</div>
											</td>
										</tr>
									)
								})}
						</tbody>
					</table>
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
						<form className='form-control'>
							<div className='modal-body'>
								<div className='form-row'>
									<div className='form-label'>Title</div>
									<input
										type='text'
										className='input-field'
										placeholder='Enter event title'
										name='title'
										value={inputs.title}
										onChange={handleChange}
									/>
								</div>
								<div className='form-row'>
									<div className='form-label'>Date</div>
									<input
										type='date'
										className='input-field'
										name='date'
										value={newDate}
										onChange={handleChange}
									/>
								</div>
								{err && <p className='txt-danger'>{err}</p>}
								{successMsg && <p className='txt-success'>{successMsg}</p>}
							</div>
							<div className='modal-footer'>
								<button
									className='btn-danger'
									onClick={() => setShowEditModal(false)}
								>
									Cancel
								</button>
								<button className='btn-success' onClick={handleSubmit}>
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
						<form className='form-control'>
							<div className='modal-body'>
								<p className='txt-danger'>
									Are you sure you want to delete the event below?
								</p>
								<div className='form-row'>
									<div className='form-label'>Title</div>
									<input
										type='text'
										className='input-field'
										placeholder='Enter event title'
										name='title'
										value={inputs.title}
										disabled
									/>
								</div>
								<div className='form-row'>
									<div className='form-label'>Date</div>
									<input
										type='text'
										className='input-field'
										name='date'
										value={newDate}
										disabled
									/>
								</div>
								{err && <p className='txt-danger'>{err}</p>}
								{successMsg && <p className='txt-success'>{successMsg}</p>}
							</div>
							<div className='modal-footer'>
								<button
									className='btn-danger'
									onClick={() => setShowDeleteModal(false)}
								>
									No, cancel
								</button>
								<button className='btn-success' onClick={handleDelete}>
									Yes, proceed
								</button>
							</div>
						</form>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default Event
