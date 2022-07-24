import React, { useState, useEffect } from 'react'
import './Messages.scss'
import axios from 'axios'
import Message from '../Message/Message'

function Messages() {

  const [messages, setMessages] = useState([])

  const getMessages = async () => {
    try {
      let res = await axios.get('/api/messages')
      setMessages(res)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMessages()
  },[])

  return(
    <div className="Messages">
      Messages
    </div>
  )
}

export default Messages