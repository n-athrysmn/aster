import React, { useState } from 'react'
import BookModal from './BookModal'

const Tabs = ({ tabs, isDashboard }) => {
  const [activeTab, setActiveTab] = useState(0)

  const isBooksTabActive = activeTab === tabs.findIndex(tab => tab.id === 1)

  return (
    <div className='tabs'>
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={index === activeTab ? 'active' : ''}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}

        {isDashboard && isBooksTabActive && <BookModal/>}
      </div>
    </div>
  )
}

export default Tabs
