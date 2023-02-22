import React, { useState, useEffect } from 'react'
import './Messages.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faPaperPlane, faX, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Message from '../Message/Message'

function Messages() {

  const [messages, setMessages] = useState([])
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [showReplyMessage, setShowReplyMessage] = useState(false)
  
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

  const sendMessageReply = async () => {
    try {
      await axios.post('/api/message/reply/send', {inbox_id, subject, message})
      getMessages()
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMessages()
  },[])

  let mappedMessages = messages.map(message => {
    return (
      <Message key={message.message_id} value={message} />
    )
  })

  return(
    <div className="Messages">
      <Navbar />
      <div className="message-toolbar">
        <Link to={'/MessageInbox'} className='message-inbox-link'>
          <span className='message-back'>
            <FontAwesomeIcon icon={faArrowLeft} className='message-back-arrow-icon' />
            Back
          </span>
        </Link>
        <span onClick={() => setShowReplyMessage(!showReplyMessage)} className="message-reply">
          <FontAwesomeIcon icon={faReply} className='message-reply-icon' />
          Reply
        </span>
      </div>
      {showReplyMessage ? 
        <div className="reply-message-container">
          <input 
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            placeholder='Subject'
            type="text" 
          />
          <textarea 
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type='text'
            cols="30" 
            rows="10"
          />
          <div className="message-buttons">
            <button onClick={() => setShowReplyMessage(false)}>
              <FontAwesomeIcon icon={faX} className='message-cancel-icon' />
              Cancel
            </button>
            <button onClick={() => sendMessageReply()}>
              <FontAwesomeIcon icon={faPaperPlane} className='message-send-icon' />
              Send
            </button>
          </div>
        </div>
      :
        null
      }
      {mappedMessages}
    </div>
  )
}

export default Messages