import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'

const Announce = () => {
	const [announcements, setAnnouncements] = useState([])

	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				console.log('Fetching announcements…')
				const response = await axios.get('/others/get-announce')
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
		announce: selected ? selected.announce : '',
	})

	useEffect(() => {
		if (selected) {
			setInputs({
				title: selected.title,
				announce: selected.announce,
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
			await axios.put(`/others/edit-announce/${selected.id}`, inputs)
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
			await axios.delete(`/books/delete/${selected.id}`)
			setSuccessMsg('Your book has been deleted successfully!')
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
					<div className='card-title'>List of Announcements</div>
				</div>
				<div className='card-body'>
					<table className='tables'>
						<thead>
							<tr>
								<th>Id</th>
								<th>Title</th>
								<th>Announcement</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{announcements.length > 0 &&
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
											<td>{announcement.id}</td>
											<td>{announcement.title}</td>
											<td>{announcement.announcement}</td>
											<td>{formattedDate}</td>
											<td>
												<div className='row'>
													<button
														className='btn btn-primary'
														onClick={() => setShowEditModal(true)}
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
									className='btn-danger'
									onClick={() => {
										handleCancelEdit()
										setShowEditModal(false)
									}}
								>
									Cancel
								</button>
								<button
									className='btn-success'
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
						<div className='modal-body'>
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
								Yes, delete book
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default Announce
