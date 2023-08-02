import React from 'react'
import error404 from '../assets/error-404.svg'
import Reg from '../assets/bg10-dark.jpeg'

const NotFound = () => {
	return (
		<div
			className='d-flex flex-column flex-center flex-column-fluid'
			style={{ backgroundImage: `url(${Reg})` }}
		>
			{/*begin::Content*/}
			<div className='d-flex flex-column flex-center text-center p-10'>
				{/*begin::Wrapper*/}
				<div className='card card-flush w-lg-650px'>
					<div className='card-body'>
						{/*begin::Title*/}
						<h1 className='fw-bolder fs-2hx text-gray-900 mb-4'>
							Page Not Found
						</h1>
						{/*end::Title*/}
						{/*begin::Text*/}
						<div className='fw-semibold fs-6 text-gray-500 mb-7'>
							The page you are looking for does not exist.
						</div>
						{/*end::Text*/}
						{/*begin::Illustration & login*/}
						<div className='mb-0'>
							<img alt='Logo' src={error404} className='h-50' />
						</div>
						{/*end::Illustration & login*/}
					</div>
				</div>
				{/*end::Wrapper*/}
			</div>
			{/* {/*end::Content*/}
		</div>
	)
}

export default NotFound
