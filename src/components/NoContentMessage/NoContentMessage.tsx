import React from 'react'
import './NoContentMessage.scss'

interface noMessageProps {
  subject: string
}

export const NoContentMessage: React.FC<noMessageProps> = (props) => {
  
  const {subject} = props

  return(
    <div className="NoContentMessage">
      <div className='message-container'>
        <span>{subject}</span>
      </div>
    </div>
  )
}

export default NoContentMessage