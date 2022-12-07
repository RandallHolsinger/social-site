import React, { useState, useEffect } from 'react'
import './MessengerContent.scss'
import FormatedTime from '../FormatedTime/FormatedTime'
import FormatedDate from '../FormatedDate/FormatedDate'

function MessengerContent(props){

  const {socket, setShowMessenger} = props

  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState('')
  

  useEffect(() => {
    socket.on('messageResponse', ( data ) => setMessages([...messages, data]))
    console.log('here is the message state =>', messages)
   }, [socket, messages])

   useEffect(() => {
    socket.on('typing response', data => {
       setTypingStatus(data)
    }, [socket])
   })
  
  return(
    <div className="MessengerContent">
      <div className='messenger-message-container'>
        {messages.map((message) =>
          message.userId === localStorage.getItem('userId') ? (
            <div className='message-chat' key={message.id}>
              <div className='sender-container'>
                <div className="message-sender">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className='message-chat' key={message.id}>
              <div className="recipient-container">
                  <p className='recipient-name'>{message.firstName}{' '}{message.lastName}</p>
                <div className='message-recipient'>
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
      </div>
    </div>
  )
}

export default MessengerContent