import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'

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

	const [showModal, setShowModal] = useState(false)

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

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

	return (
		<div className='home'>
			<div className='card' id='students'>
				<div className='card-title'>List of Events</div>
				<div className='card-body'>
					<table className='userTable'>
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
									)
								})}
						</tbody>
					</table>
				</div>
			</div>
			{showModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Edit event</h2>
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

export default Event
