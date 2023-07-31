import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Toolbar from '../layout/Toolbar'

const ManageAdmins = () => {
	const pageTitle = 'Manage Admin'
	const pageDescription = 'List of Admins'
	const { currentAdmin } = useContext(AuthContext)
	const [admins, setAdmins] = useState([])

	useEffect(() => {
		const fetchAdmins = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/admins`
				)

				const data = response.data
				setAdmins(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchAdmins()
	}, [])

	const [showEditModal, setShowEditModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedAdmin, setSelectedAdmin] = useState(null)

	const [inputs, setInputs] = useState({
		adminName: selectedAdmin ? selectedAdmin.adminName : '',
		adminEmail: selectedAdmin ? selectedAdmin.adminEmail : '',
		staffId: selectedAdmin ? selectedAdmin.staffId : '',
		status: selectedAdmin ? selectedAdmin.status : '',
		type: selectedAdmin ? selectedAdmin.type : '',
	})

	useEffect(() => {
		if (selectedAdmin) {
			setInputs({
				adminName: selectedAdmin.adminName,
				adminEmail: selectedAdmin.adminEmail,
				staffId: selectedAdmin.staffId,
				status: selectedAdmin.status,
				type: selectedAdmin.type,
			})
		}
	}, [selectedAdmin])

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/users/admin-edit/${selectedAdmin.id}`,
				inputs
			)
			setSuccessMsg('Admin status updated!')
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
				`${process.env.REACT_APP_API_URL}/users/delete-admin/${selectedAdmin.id}`
			)
			setSuccessMsg('Admin has been deleted!')
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
	if (currentAdmin.type !== 'Super Admin') {
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
							<div className='card-title'>List of Admins</div>
						</div>
						<div className='card-body'>
							<div className='table-responsive mh-500px scroll-y'>
								<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 text-center'>
									<thead>
										<tr>
											<th className='fs-6 fw-bold'>Name</th>
											<th className='fs-6 fw-bold'>Email</th>
											<th className='fs-6 fw-bold'>Staff Id</th>
											<th className='fs-6 fw-bold'>Status</th>
											<th className='fs-6 fw-bold'>Type</th>
											<th className='fs-6 fw-bold'>Actions</th>
										</tr>
									</thead>
									<tbody>
										{Array.isArray(admins) &&
											admins.length > 0 &&
											admins.map((admin) => {
												return (
													<tr key={admin.id}>
														<td>{admin.adminName}</td>
														<td>{admin.adminEmail}</td>
														<td>{admin.staffId}</td>
														<td>
															<span
																className={
																	admin.status === 1
																		? 'badge badge-light-success'
																		: 'badge badge-light-danger'
																}
															>
																{admin.status === 1
																	? 'Authorized'
																	: 'Unauthorized'}
															</span>
														</td>
														<td>{admin.type}</td>
														<td>
															{admin.type !== 'Super Admin' ? (
																<>
																	<button
																		className='btn btn-icon btn-warning btn-sm me-1'
																		onClick={() => {
																			setSelectedAdmin(admin)
																			setShowEditModal(true)
																		}}
																		title='Edit'
																	>
																		<FaEdit />
																	</button>
																	<button
																		className='btn btn-icon btn-danger btn-sm me-1'
																		onClick={() => {
																			setSelectedAdmin(admin)
																			setShowDeleteModal(true)
																		}}
																		title='Delete'
																	>
																		<FaTrash />
																	</button>
																</>
															) : (
																<span className='text-danger'>
																	No Available Actions
																</span>
															)}
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
							<h2>Update admin status</h2>
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
										Select Status
									</label>
									{/*end::Label*/}
									<select
										value={inputs.status}
										className='form-control form-control-lg form-control-solid'
										name='status'
										onChange={handleChange}
									>
										<option value={1}>Authorized</option>
										<option value={0}>Unauthorized</option>
									</select>
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
									Update Status
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
							<h2>Delete admin</h2>
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
									Are you sure you want to delete the admin below?
								</p>
								{/*begin::Input group*/}
								<div className='d-flex flex-column mb-8 fv-row'>
									{/*begin::Label*/}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										Name
									</label>
									{/*end::Label*/}
									<input
										type={'text'}
										onChange={handleChange}
										name='adminName'
										value={inputs.adminName}
										disabled
										className='form-control form-control-lg form-control-solid'
									/>
								</div>
								{/*end::Input group*/}
								{/*begin::Input group*/}
								<div className='d-flex flex-column mb-8 fv-row'>
									{/*begin::Label*/}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										Email
									</label>
									{/*end::Label*/}
									<input
										type={'email'}
										onChange={handleChange}
										name='adminEmail'
										value={inputs.adminEmail}
										disabled
										className='form-control form-control-lg form-control-solid'
									/>
								</div>
								{/*end::Input group*/}
								{/*begin::Input group*/}
								<div className='d-flex flex-column mb-8 fv-row'>
									{/*begin::Label*/}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										Staff Id
									</label>
									{/*end::Label*/}
									<input
										type={'text'}
										onChange={handleChange}
										name='staffId'
										value={inputs.staffId}
										disabled
										className='form-control form-control-lg form-control-solid'
									/>
								</div>
								{/*end::Input group*/}
								{/*begin::Input group*/}
								<div className='d-flex flex-column mb-8 fv-row'>
									{/*begin::Label*/}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										Status
									</label>
									{/*end::Label*/}
									<input
										type={'text'}
										onChange={handleChange}
										name='status'
										value={inputs.status === 1 ? 'Authorized' : 'Unauthorized'}
										disabled
										className='form-control form-control-lg form-control-solid'
									/>
								</div>
								{/*end::Input group*/}
								{/*begin::Input group*/}
								<div className='d-flex flex-column mb-8 fv-row'>
									{/*begin::Label*/}
									<label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
										Type
									</label>
									{/*end::Label*/}
									<input
										type={'text'}
										onChange={handleChange}
										name='type'
										value={inputs.type}
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

export default ManageAdmins
