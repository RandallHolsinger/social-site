import React, { useState, useEffect } from 'react'
import './Messages.scss'
import axios from 'axios'
import Search from '../Search/Search'
import Message from '../Message/Message'
import Navbar from '../Navbar/Navbar'

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

  let mappedMessages = messages.map(message => {
    <Message key={message.message_id} value={message} />
  })

  return(
    <div className="Messages">
      <Search />
      {mappedMessages}
      <Navbar />
    </div>
  )
}

export default Messages