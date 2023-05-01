import React from 'react'
import './PageTitle.scss'

interface PageTitleProps {
  icon: React.ReactNode,
  title: string,
}

export const PageTitle: React.FC<PageTitleProps> = (props) => {
  
  const { icon, title } = props

  return(
    <div className="PageTitle">
      <span className="page-title-icon">
        {icon}
      </span>
      <span className="page-title-text">
        {title}
      </span>
    </div>
  )
}

export default PageTitle