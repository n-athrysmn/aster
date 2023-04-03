import React, { useState } from 'react'
import axios from 'axios'

function BookModal({ setBooks }) {
	const [showModal, setShowModal] = useState(false)
	const [barcodeNumber, setBarcodeNumber] = useState('')

	function fetchBooks(barcode) {
		axios
			.get(`/api/books/${barcode}`)
			.then((response) => {
				setBooks(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	function handleAddBook() {
		fetchBooks(barcodeNumber)
		setShowModal(false)
	}

	function handleBarcodeNumberChange(event) {
		setBarcodeNumber(event.target.value)
	}

	return (
		<div>
			<button className='btn right' onClick={() => setShowModal(true)}>
				Add Book
			</button>
			{showModal ? (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1>Add more book</h1>
							<p className='right-header' onClick={() => setShowModal(false)}>
								X
							</p>
						</div>
						<div className='modal-body'>
							<p>
								Enter your book barcode number here in the box, then click the
								"Add Book" button.
							</p>
							<input
								className='form-input'
								type={'text'}
								placeholder={
									'Enter your 13-digit ISBN number. Ex: 9789672443710'
								}
								name='barcode'
								value={barcodeNumber}
								onChange={handleBarcodeNumberChange}
							/>
						</div>
						<div className='modal-footer'>
							<button
								className='danger-btn'
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button className='success-btn' onClick={handleAddBook}>
								Add Book
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default BookModal
