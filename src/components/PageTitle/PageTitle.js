import React from 'react'
import './PageTitle.scss'

function PageTitle(props) {
  
  const {icon, title, Component} = props

  return(
    <div className="PageTitle">
      <span className="page-title-icon">
        {icon}
      </span>
      <span className="page-title-text">
        {title}
      </span>
      {Component ?
        <div className="page-title-component-container">
          {Component}
        </div>
      :
        null
      }
    </div>
  )
}

export default PageTitle