import React, { useState } from 'react'
import '../style.scss'

const Tabs = ({ tabs}) => {
    const [activeTab, setActiveTab] = useState(0)

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

        <button className='btn'>Got more books? Click here to add more</button>
      </div>
    </div>
  )
}

export default Tabs
