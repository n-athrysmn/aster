import React from 'react'

const Toolbar = ({ pageTitle, pageDescription }) => {
	const today = new Date()
	return (
		<div className='toolbar py-2' id='kt_toolbar'>
			{/*begin::Container*/}
			<div
				id='kt_toolbar_container'
				className='container-fluid d-flex align-items-center'
			>
				{/*begin::Page title*/}
				<div className='flex-grow-1 flex-shrink-0 me-5'>
					{/*begin::Page title*/}
					<div
						data-kt-swapper='true'
						data-kt-swapper-mode='prepend'
						data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
						className='page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0'
					>
						{/*begin::Title*/}
						<h1 className='d-flex align-items-center text-dark fw-bold my-1 fs-3'>
							{pageTitle}
							{/*begin::Separator*/}
							<span className='h-20px border-gray-200 border-start ms-3 mx-2'></span>
							{/*end::Separator*/}
							{/*begin::Description*/}
							<small className='text-muted fs-7 fw-semibold my-1 ms-1'>
								{pageDescription}
							</small>
							{/*end::Description*/}
						</h1>
						{/*end::Title*/}
					</div>
					{/*end::Page title*/}
				</div>
				{/*end::Page title*/}

				{/* begin::Wrapper */}
				<div className='d-flex align-items-center'>
					{/* begin::Daterangepicker */}
					<span
						className='btn btn-sm btn-bg-light btn-color-primary'
						id='kt_dashboard_daterangepicker'
						data-bs-toggle='tooltip'
						data-bs-trigger='hover'
					>
						{/* <span className='fw-bold me-1' id='kt_dashboard_daterangepicker_title'>
                Range:
              </span> */}
						<span className='fw-bolder' id='kt_dashboard_daterangepicker_date'>
							{/* <?php echo date('F j')?> */}
							Hey there! Today is: {today.getDate()}{' '}
							{today.toLocaleString('default', { month: 'long' })}
						</span>
					</span>
					{/* end::Daterangepicker */}
				</div>
				{/* end::Wrapper */}
			</div>
			{/*end::Container*/}
		</div>
	)
}

export default Toolbar
