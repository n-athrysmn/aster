import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Announce = () => {
	const [announcements, setAnnouncements] = useState([])

	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				console.log('Fetching announcements…')
				const response = await axios.get('/others/announce')
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
			await axios.delete(`/others/delete-announce/${selected.id}`)
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

	return (
		<div className='home'>
			<div className='card'>
				<div className='card-header'>
					<div className='card-title'>List of Announcements</div>
				</div>
				<div className='card-body'>
					<table className='tables'>
						<thead>
							<tr>
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
											<td>{announcement.title}</td>
											<td>{announcement.announcement}</td>
											<td>{formattedDate}</td>
											<td>
												<div className='row'>
													<button
														className='btn btn-sm btn-warning'
														onClick={() => {
															setSelected(announcement)
															setShowEditModal(true)
														}}
														title='Edit'
													>
														<FaEdit />
													</button>
													<button
														className='btn btn-sm btn-danger'
														onClick={() => {
															setSelected(announcement)
															setShowDeleteModal(true)
														}}
														title='Delete'
													>
														<FaTrash />
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
						<form className='form-control'>
							<div className='modal-body'>
								<p className='mb10'>Enter announcement title</p>
								<input
									type={'text'}
									onChange={handleChange}
									className='input-field'
									value={inputs.title}
									name='title'
								/>
								<span className='small mb20'>
									Other users won't be able to see this, this is for admin only.
								</span>
								<p className='mb10'>Write announcement in the box</p>
								<textarea
									className='textarea-field mb20'
									onChange={handleChange}
									value={inputs.announcement}
									name='announcement'
								/>
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
						<form action='' className='form-control'>
							<div className='modal-body'>
								<p className='txt-danger'>
									Are you sure you want to delete the announcement below?
								</p>
								<p className='mb10'>Announcement title</p>
								<input
									type='text'
									className='input-field'
									name='title'
									value={inputs.title}
									disabled
								/>
								<span className='small mb20'>
									Other users won't be able to see this, this is for admin only.
								</span>
								<p className='mb10'>Announcement</p>
								<textarea
									className='textarea-field mb20'
									value={inputs.announcement}
									name='announcement'
									disabled
								/>
								{err && <p className='txt-danger'>{err}</p>}
								{successMsg && <p className='txt-success'>{successMsg}</p>}
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

export default Announce
