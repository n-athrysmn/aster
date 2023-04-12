import React from 'react'

const ShortcutModal = ({ title, message, onConfirm, onCancel }) => {
	return (
		<div className='modal'>
			<div className='modal-content'>
				<div className='modal-header'>
					<h2>{title}</h2>
				</div>
				<div className='modal-body'>
					<p>{message}</p>
				</div>
				<div className='modal-footer'>
					<button className='btn btn-sm btn-danger' onClick={onCancel}>
						No, cancel
					</button>
					<button className='btn btn-sm btn-success' onClick={onConfirm}>
						Yes, proceed
					</button>
				</div>
			</div>
		</div>
	)
}

export default ShortcutModal
