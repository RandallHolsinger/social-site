import React, { useState, useEffect } from 'react'
import './Messages.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Message from '../Message/Message'

function Messages() {

  const [messages, setMessages] = useState([])
  
  const {inbox_id} = useParams()

  const getMessages = async () => {
    try {
      let res = await axios.get(`/api/messages/${inbox_id}`)
      setMessages(res.data)
      console.log('messages here', res.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMessages()
  },[])

  let mappedMessages = messages.map(message => {
    <Message key={message.message_id} value={message}/>
  })

  return(
    <div className="Messages">
      <Navbar />
      {mappedMessages}
    </div>
  )
}

export default Messages