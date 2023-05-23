import React, { useState } from 'react'

const Tabs = ({ tabs, isDashboard }) => {
	const [activeTab, setActiveTab] = useState(0)

	const isBooksTabActive = activeTab === tabs.findIndex((tab) => tab.id === 1)

	let colClassName = 'col-6'
	if (tabs.length === 2) {
		colClassName = 'col-6'
	} else if (tabs.length === 3) {
		colClassName = 'col-4'
	} else {
		colClassName = 'col-3'
	}

	return (
		<div className='card card-flush'>
			<div className='card-body'>
				<ul className='nav nav-pills nav-pills-custom row position-relative mx-0 mb-9'>
					{tabs.map((tab, index) => (
						<li key={index} className={`nav-item ${colClassName} mx-0 p-0`}>
							<button
								onClick={() => setActiveTab(index)}
								className={`nav-link active d-flex justify-content-center w-100 border-0 h-100 ${
									index === activeTab ? 'active' : ''
								}`}
								data-bs-toggle='pill'
							>
								<span className='nav-text text-gray-800 fw-bold fs-6 mb-3'>
									{tab.title}
								</span>
								{index === activeTab && (
									<span className='bullet-custom position-absolute z-index-2 bottom-0 w-100 h-4px bg-primary rounded'></span>
								)}
							</button>
						</li>
					))}
				</ul>
				<div className='tab-content text-center'>
					<div className='tab-pane fade show active'>
						{tabs[activeTab].content}
						{isDashboard && isBooksTabActive}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Tabs
