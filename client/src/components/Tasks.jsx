import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import axios from 'axios'

const Tasks = () => {
	const { currentAdmin } = useContext(AuthContext)
	const adminId = currentAdmin?.id
	console.log('admin id: ', adminId)
	const [showAddModal, setShowAddModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selected, setSelected] = useState(null)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		async function fetchTasks() {
			try {
				console.log('Fetching tasks…')
				const response = await axios.get(`/others/get-tasks/${adminId}`)
				console.log('Response:', response)
				const data = response.data
				console.log('Data:', data)
				setTasks(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchTasks()
	}, [adminId])

	console.log('tasks: ', tasks)

	const [inputs, setInputs] = useState({
		title: selected ? selected.title : '',
		priority: selected ? selected.priority : '',
		deadline: selected ? selected.deadline : '',
	})

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')
	console.log(inputs)

	useEffect(() => {
		if (selected) {
			setInputs({
				title: selected.title,
				priority: selected.priority,
				deadline: selected.deadline,
			})
		}
	}, [selected])

	const handleCancelEdit = () => {
		setShowEditModal(false)
		setInputs({
			title: selected.title,
			priority: selected.priority,
			deadline: selected.deadline,
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
			await axios.post('/others/add-task', {
				...inputs,
				adminId,
			})
			setTimeout(() => {
				setSuccessMsg('')
				window.location.reload()
			}, 3000)
			setSuccessMsg('Task added successfully!')
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const handleEdit = async (e) => {
		e.preventDefault()
		try {
			await axios.put(`/others/edit-task/${selected.id}`, inputs)
			setSuccessMsg('The task has been edited successfully!')
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
			await axios.delete(`/others/delete-task/${selected.id}`)
			setSuccessMsg('The task has been deleted successfully!')
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
		<div className='card'>
			<div className='card-header'>
				<div className='card-title'>
					{currentAdmin.adminName} tasks for today!
				</div>
				<div className='card-tools'>
					<button
						className='btn btn-sm btn-primary'
						onClick={() => setShowAddModal(true)}
					>
						Add task <FaPlus />
					</button>
				</div>
			</div>

			<div className='card-body'>
				{Array.isArray(tasks) && tasks.length > 0 ? (
					<table className='tables center'>
						<thead>
							<tr>
								<th>Title</th>
								<th>Priority</th>
								<th>Deadline</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task) => {
								const deadline = new Date(task.deadline)
								const formattedDate = deadline.toLocaleDateString('en-GB', {
									day: 'numeric',
									month: 'numeric',
									year: 'numeric',
								})

								let priorityClassName
								switch (task.priority) {
									case 'High':
										priorityClassName = 'tag small-tag tag-danger'
										break
									case 'Medium':
										priorityClassName = 'tag small-tag tag-warning'
										break
									case 'Low':
										priorityClassName = 'tag small-tag tag-success'
										break
									default:
										priorityClassName = 'tag small-tag untag'
								}

								return (
									<tr key={task.id}>
										<td>
											<p>{task.title}</p>
										</td>
										<td>
											<p className={priorityClassName}>{task.priority}</p>
										</td>
										<td>
											<p>{formattedDate}</p>
										</td>
										<td>
											<div className='row'>
												<button
													className='btn btn-sm btn-warning'
													title='Edit'
													onClick={() => {
														setSelected(task)
														setShowEditModal(true)
													}}
												>
													<FaEdit />
												</button>
												<button
													className='btn btn-sm btn-danger'
													title='Delete'
													onClick={() => {
														setSelected(task)
														setShowDeleteModal(true)
													}}
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
				) : (
					<p className='txt-danger'>No tasks available</p>
				)}
			</div>
			{/*add task modal*/}
			{showAddModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Add Task</h2>
							<p
								className='right-header'
								onClick={() => setShowAddModal(false)}
							>
								X
							</p>
						</div>
						<form className='form-control'>
							<div className='modal-body'>
								<div className='form-label'>Title</div>
								<input
									type='text'
									className='input-field'
									onChange={handleChange}
									name='title'
								/>
								<div className='form-label'>Priority</div>
								<select
									name='priority'
									className='select-field'
									onChange={handleChange}
								>
									<option value={'Untagged'}>Choose Priority</option>
									<option value={'High'}>High</option>
									<option value={'Medium'}>Medium</option>
									<option value={'Low'}>Low</option>
								</select>
								<div className='form-label'>Deadline</div>
								<input
									type='date'
									className='input-field'
									onChange={handleChange}
									name='deadline'
								/>
								{err && <p className='txt-danger'>{err}</p>}
								{successMsg && <p className='txt-success'>{successMsg}</p>}
							</div>
							<div className='modal-footer'>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => setShowAddModal(false)}
								>
									Cancel
								</button>
								<button className='btn btn-sm btn-success' onClick={handleAdd}>
									Add Task
								</button>
							</div>
						</form>
					</div>
				</div>
			) : null}
			{/*edit task modal*/}
			{showEditModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Edit Task</h2>
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
								<div className='form-label'>Title</div>
								<input
									type='text'
									className='input-field'
									onChange={handleChange}
									name='title'
									value={inputs.title}
								/>
								<div className='form-label'>Priority</div>
								<select
									name='priority'
									className='select-field'
									onChange={handleChange}
									value={inputs.priority}
								>
									<option value={'Untagged'}>Choose Priority</option>
									<option value={'High'}>High</option>
									<option value={'Medium'}>Medium</option>
									<option value={'Low'}>Low</option>
								</select>
								<div className='form-label'>Deadline</div>
								<input
									type='date'
									className='input-field'
									onChange={handleChange}
									name='deadline'
									value={inputs.deadline}
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
									Edit Task
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
							<h2>Delete Task</h2>
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
									Are you sure you want to delete the task below?
								</p>
								<label className='form-label'>Title</label>
								<input
									type='text'
									className='input-field'
									onChange={handleChange}
									name='title'
									value={inputs.title}
									disabled
								/>
								<label className='form-label'>Priority</label>
								<input
									type='text'
									className='input-field'
									onChange={handleChange}
									name='title'
									value={inputs.priority}
									disabled
								/>
								<label className='form-label'>Deadline</label>
								<input
									type='date'
									className='input-field'
									onChange={handleChange}
									name='deadline'
									value={inputs.deadline}
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

export default Tasks
