import React, { useState, useEffect } from 'react'
import './Messages.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faPaperPlane, faX, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Message from '../Message/Message'

export interface IMessage {
  message_id: number,
  message_sender: number,
  conversation_id: number,
  subject: string,
  message: string,
  date: string,
  user_id: number,
  first_name: string,
  last_name: string,
  profile_img?: string
}


export const Messages: React.FC = () => {

  const [messages, setMessages] = useState<IMessage[]>([])
  const [message, setMessage] = useState('')
  const [showReplyMessage, setShowReplyMessage] = useState(false)
  
  const { conversation_id } = useParams()
  const { friend_uid } = useParams()

  const updateMessageNotifications = async () => {
    console.log('hitting front function')
    try {
      axios.put(`/api/messages/notifications/update/${conversation_id}`)
    } catch(err) {
      console.log(err)
    }
  }

  const getMessages = async () => {
    try {
      let res = await axios.get(`/api/messages/${conversation_id}`)
      setMessages(res.data)
      updateMessageNotifications()
    } catch(err) {
      console.log(err)
    }
  }

  const sendMessageReply = async () => {
    try {
      if(messages[0]){
      let subject = messages[0].subject
      console.log('subject being sent =>', subject)
      await axios.post('/api/message/reply/send', {conversation_id, friend_uid, message, subject})
      getMessages()
      setShowReplyMessage(false)
      }
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
      {mappedMessages}
      {showReplyMessage ? 
        <div className="message-reply-container">
          <div className="message-reply-header">
            <FontAwesomeIcon icon={faReply} className='message-reply-header-icon'/>
            <h2>Message Reply</h2>
          </div>
          <textarea 
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            value={message}
            cols={30} 
            rows={10}
          />
          <div className="message-reply-buttons">
            <button onClick={() => sendMessageReply()} className='message-reply-send-button'>
              <FontAwesomeIcon icon={faPaperPlane} className='message-reply-send-icon' />
              Send
            </button>
            <button onClick={() => setShowReplyMessage(false)} className='message-reply-cancel-button'>
              <FontAwesomeIcon icon={faX} className='message-reply-cancel-icon' />
              Cancel
            </button>
          </div>
        </div>
      :
        null
      }
    </div>
  )
}

export default Messages