import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa'
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
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/others/get-tasks/${adminId}`
				)
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
		formattedDeadline: selected ? selected.formattedDeadline : '',
		isDone: selected ? selected.isDone : '',
	})

	const [err, setError] = useState(null)
	const [successMsg, setSuccessMsg] = useState('')
	console.log(inputs)

	useEffect(() => {
		if (selected) {
			setInputs({
				title: selected.title,
				priority: selected.priority,
				formattedDeadline: selected.formattedDeadline,
				isDone: selected ? selected.isDone : '',
			})
		}
	}, [selected])

	const handleCancelEdit = () => {
		setShowEditModal(false)
		setInputs({
			title: selected.title,
			priority: selected.priority,
			formattedDeadline: selected.formattedDeadline,
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
			await axios.post(`${process.env.REACT_APP_API_URL}/others/add-task`, {
				...inputs,
				adminId,
			})
			setSuccessMsg('Task added successfully!')
			// Fetch the updated tasks from the server and update the state
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/others/get-tasks/${adminId}`
			)
			const updatedTasks = response.data
			setTasks(updatedTasks)

			setTimeout(() => {
				setShowAddModal(false)
				setSuccessMsg('')
				setError('')
			}, 1000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const handleEdit = async (e) => {
		e.preventDefault()
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/others/edit-tasks/${selected.id}`,
				inputs
			)
			setSuccessMsg('The task has been edited successfully!')
			// Fetch the updated tasks from the server and update the state
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/others/get-tasks/${adminId}`
			)
			const updatedTasks = response.data
			setTasks(updatedTasks)

			setTimeout(() => {
				setShowEditModal(false)
				setSuccessMsg('')
				setError('')
			}, 1000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const handleDelete = async (e) => {
		e.preventDefault()
		try {
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/others/delete-task/${selected.id}`
			)
			setSuccessMsg('The task has been deleted successfully!')
			// Fetch the updated tasks from the server and update the state
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/others/get-tasks/${adminId}`
			)
			const updatedTasks = response.data
			setTasks(updatedTasks)

			setTimeout(() => {
				setShowDeleteModal(false)
				setSuccessMsg('')
				setError('')
			}, 1000)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	const handleDone = async (taskId, task) => {
		try {
			const updatedInputs = { ...inputs, isDone: !task.isDone }
			await axios.put(
				`${process.env.REACT_APP_API_URL}/others/task-done/${taskId}`,
				updatedInputs
			)

			// Update the tasks state with the updated data
			const updatedTasks = tasks.map((task) => {
				if (task.id === taskId) {
					return { ...task, isDone: !task.isDone }
				}
				return task
			})
			setTasks(updatedTasks)
		} catch (err) {
			setError(`Error: ${err.response.data}`)
			console.log(err)
		}
	}

	return (
		<div className='card h-lg-100'>
			<div className='card-header'>
				<div className='card-title'>
					{currentAdmin.adminName} tasks for today!
				</div>
				<div className='card-toolbar'>
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
					<div className='table-responsive mh-400px scroll-y p-10'>
						<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 text-center'>
							<thead>
								<tr>
									<th className='fs-6 fw-bold'>Title</th>
									<th className='fs-6 fw-bold'>Priority</th>
									<th className='fs-6 fw-bold'>Deadline</th>
									<th className='fs-6 fw-bold'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{Array.isArray(tasks) &&
									tasks.map((task) => {
										const deadline = new Date(task.deadline)
										const formattedDate = deadline.toLocaleDateString('en-GB', {
											day: 'numeric',
											month: 'numeric',
											year: 'numeric',
										})

										let priorityClassName
										switch (task.priority) {
											case 'High':
												priorityClassName = `badge ${
													task.isDone ? 'badge-light' : 'badge-light-danger'
												}`
												break
											case 'Medium':
												priorityClassName = `badge ${
													task.isDone ? 'badge-light' : 'badge-light-danger'
												}`
												break
											case 'Low':
												priorityClassName = `badge ${
													task.isDone ? 'badge-light' : 'badge-light-success'
												}`
												break
											default:
												priorityClassName = `badge ${
													task.isDone ? 'badge-light' : 'badge-light-dark'
												}`
										}

										return (
											<tr
												key={task.id}
												className={`${task.isDone ? 'text-muted' : ''}`}
											>
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
													{task.isDone ? (
														<button
															name='isDone'
															value={false}
															className={`btn btn-icon btn-light-danger btn-sm me-1`}
															title={'Mark as undone'}
															onClick={() => handleDone(task.id, task)}
														>
															<FaTimes />
														</button>
													) : (
														<button
															name='isDone'
															value={true}
															className={`btn btn-icon btn-success btn-sm me-1`}
															title={'Mark as done'}
															onClick={() => handleDone(task.id, task)}
														>
															<FaCheck />
														</button>
													)}
													<button
														className='btn btn-icon btn-warning btn-sm me-1'
														title='Edit'
														onClick={() => {
															setSelected(task)
															setShowEditModal(true)
														}}
													>
														<FaEdit />
													</button>
													<button
														className='btn btn-icon btn-danger btn-sm me-1'
														title='Delete'
														onClick={() => {
															setSelected(task)
															setShowDeleteModal(true)
														}}
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
				) : (
					<p className='text-danger fw-bold fs-3'>No tasks available</p>
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
						<form className='form'>
							<div className='modal-body'>
								<div className='min-h-250px scroll-y p-10'>
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
											placeholder='Ex: Update June calendar'
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Priority
										</label>
										{/*end::Label*/}
										<select
											name='priority'
											onChange={handleChange}
											className='form-select form-select-solid form-select-lg fw-semibold'
										>
											<option value={'Untagged'}>Choose Priority</option>
											<option value={'High'}>High</option>
											<option value={'Medium'}>Medium</option>
											<option value={'Low'}>Low</option>
										</select>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Deadline
										</label>
										{/*end::Label*/}
										<input
											type={'date'}
											onChange={handleChange}
											name='deadline'
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{err && <p className='text-danger'>{err}</p>}
									{successMsg && <p className='text-success'>{successMsg}</p>}
								</div>
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
						<form className='form'>
							<div className='modal-body'>
								<div className='min-h-250px scroll-y p-10'>
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
											placeholder='Ex: Update June calendar'
											className='form-control form-control-lg form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Priority
										</label>
										{/*end::Label*/}
										<select
											name='priority'
											onChange={handleChange}
											value={inputs.priority}
											className='form-select form-select-solid form-select-lg fw-semibold'
										>
											<option value={'Untagged'}>Choose Priority</option>
											<option value={'High'}>High</option>
											<option value={'Medium'}>Medium</option>
											<option value={'Low'}>Low</option>
										</select>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Deadline
										</label>
										{/*end::Label*/}
										<input
											type={'date'}
											onChange={handleChange}
											name='formattedDeadline'
											value={inputs.formattedDeadline}
											className='form-control form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{err && <p className='text-danger'>{err}</p>}
									{successMsg && <p className='text-success'>{successMsg}</p>}
								</div>
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
						<form action='' className='form'>
							<div className='modal-body'>
								<div className='min-h-250px scroll-y p-10'>
									<p className='text-danger fw-bold'>
										Are you sure you want to delete the task below?
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
											placeholder='Ex: Update June calendar'
											className='form-control form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Priority
										</label>
										{/*end::Label*/}
										<select
											name='priority'
											onChange={handleChange}
											value={inputs.priority}
											disabled
											className='form-select form-control-solid'
										>
											<option value={'Untagged'}>Choose Priority</option>
											<option value={'High'}>High</option>
											<option value={'Medium'}>Medium</option>
											<option value={'Low'}>Low</option>
										</select>
									</div>
									{/*end::Input group*/}
									{/*begin::Input group*/}
									<div className='d-flex flex-column mb-8 fv-row'>
										{/*begin::Label*/}
										<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
											Deadline
										</label>
										{/*end::Label*/}
										<input
											type={'date'}
											onChange={handleChange}
											name='formattedDeadline'
											disabled
											value={inputs.formattedDeadline}
											className='form-control form-control-solid'
										/>
									</div>
									{/*end::Input group*/}
									{err && <p className='text-danger'>{err}</p>}
									{successMsg && <p className='text-success'>{successMsg}</p>}
								</div>
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
