import React, { useState, useEffect } from 'react'
import './MessengerContent.scss'

function MessengerContent(props){

  const {socket, setShowMessenger} = props

  const [messages, setMessages] = useState([])
  

  useEffect(() => {
    socket.on('messageResponse', ( data ) => setMessages([...messages, data]))
    console.log('messages ==>', messages)
   }, [socket, messages])
  
  return(
    <div className="MessengerContent">
      <header>
        <button onClick={() => setShowMessenger(false)}>Close Chat</button>
      </header>
      <div className='messenger-message-container'>
        {messages.map((message) =>
          message.userId === localStorage.getItem('userId') ? (
            <div className='message-chat' key={message.id}>
              <p className='sender-name'>You</p>
              <div className="message-sender">
                <p>{message.text}</p>
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
          <p>Someone is typing...</p>
        </div>
      </div>
    </div>
  )
}

export default MessengerContent