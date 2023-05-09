import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const BookDetails = () => {
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
		<div className='home'>
			<div className='card'>
				<div className='card-header'>
					<div className='card-title'>List of Answers</div>
				</div>
				<div className='card-body'>
					{Array.isArray(videos) && videos.length > 0 ? (
						<table className='tables'>
							<thead>
								<tr>
									<th>Title</th>
									<th>Link</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{videos.map((video) => (
									<tr key={video.id}>
										<td>{video.title}</td>
										<td>{video.link}</td>
										<td>
											<div className='row'>
												<a
													href={video.link}
													className='btn btn-sm btn-success'
													target='_blank'
													rel='noopener noreferrer'
												>
													<FaEye />
												</a>
												<button
													className='btn btn-sm btn-warning'
													onClick={() => {
														setSelected(video)
														setShowEditModal(true)
													}}
												>
													<FaEdit />
												</button>
												<button
													className='btn btn-sm btn-danger'
													onClick={() => {
														setSelected(video)
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
					) : (
						<p className='txt-danger'>No answers uploaded for this book</p>
					)}
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
						<form className='form-control'>
							<div className='modal-body'>
								<p className='mb10'>Enter video title</p>
								<input
									type={'text'}
									onChange={handleChange}
									className='input-field'
									value={inputs.title}
									name='title'
								/>
								<p className='mb10'>Enter video link</p>
								<input
									type={'url'}
									onChange={handleChange}
									className='input-field'
									value={inputs.link}
									name='link'
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
						<form className='form-control'>
							<div className='modal-body'>
								<p className='txt-danger'>
									Are you sure you want to delete the video below?
								</p>
								<div className='form-row'>
									<div className='form-label'>Video Title</div>
									<input
										type='text'
										className='input-field'
										value={inputs.title}
										name='title'
										disabled
									/>
								</div>
								<div className='form-row'>
									<div className='form-label'>Video Link</div>
									<input
										type='url'
										className='input-field'
										value={inputs.link}
										name='link'
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

export default BookDetails
