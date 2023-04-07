import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const BookDetails = () => {
	const location = useLocation()

	const bookId = location.pathname.split('/')[2]
	const [videos, setVideos] = useState({})

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				console.log('Fetching book details…')
				const res = await axios.get(`/books/details/${bookId}`)
				console.log('Response:', res)
				const data = res.data
				console.log('Data:', data)
				setVideos(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchVideos()
	}, [bookId])

	const [showModal, setShowModal] = useState(false)

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')

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
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	return (
		<div className='home'>
			<div className='card' id='students'>
				<div className='card-header'>
					<div className='card-title'>List of Answers</div>
				</div>
				<div className='card-body'>
					{videos.length > 0 ? (
						<table className='tables'>
							<thead>
								<tr>
									<th>Id</th>
									<th>Title</th>
									<th>Link</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{videos.map((video) => (
									<tr key={video.id}>
										<td>{video.id}</td>
										<td>{video.title}</td>
										<td>{video.link}</td>
										<td>
											<div className='row'>
												<a
													href={video.link}
													className='btn btn-success'
													target='_blank'
													rel='noopener noreferrer'
												>
													<FaEye /> View
												</a>
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
								))}
							</tbody>
						</table>
					) : (
						<p className='txt-danger'>No answers uploaded for this book</p>
					)}
				</div>
			</div>
			{showModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Edit video</h2>
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
								className='btn btn-danger'
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button className='btn btn-success' onClick={handleSubmit}>
								Update
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default BookDetails
