import React, { useState } from 'react'

const Tabs = ({ tabs, isDashboard }) => {
	const [activeTab, setActiveTab] = useState(0)

	const isBooksTabActive = activeTab === tabs.findIndex((tab) => tab.id === 1)

	return (
		<div>
			<ul className='nav nav-pills nav-pills-custom mb-3'>
				<li className='nav-item mb-3 me-3 me-lg-6'>
					{tabs.map((tab, index) => (
						<button
							key={index}
							onClick={() => setActiveTab(index)}
							className={`nav-link d-flex justify-content-between flex-column flex-center overflow-hidden active w-80px h-85px py-4 ${
								index === activeTab ? 'active' : ''
							}`}
							data-bs-toggle='pill'
						>
							{tab.title}

							<span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary'></span>
						</button>
					))}
				</li>
			</ul>
			<div className='card'>
				<div className='card-body'>
					<div className='tab-content'>
						{tabs[activeTab].content}
						{isDashboard && isBooksTabActive}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Tabs
