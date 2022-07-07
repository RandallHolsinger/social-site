import React, { useState, useEffect } from 'react'
import './Messages.scss'
import Message from '../Message/Message'

function Messages() {

  const [messages, setMessages] = useState([])

  return(
    <div className="Messages">
      Messages
    </div>
  )
}

export default Messages