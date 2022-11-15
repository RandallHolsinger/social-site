import React, { useState } from 'react'
import './MessengerContent.scss'

function MessengerContent(props){

  const leaveChat = () => {
    const {setShowMessenger} = props
    localStorage.removeItem('user');
    setShowMessenger(false)
    //maybe set reload to clean
  }

  return(
    <div className="MessengerContent">
      <header>
        <button onClick={() => leaveChat()}>Close Chat</button>
      </header>
      {/* sender messages */}
      <div className="messenger-message-container">
        <div className="message-chat">
          <p>sender name</p>
          <div className="messenger-sender">
            <p>Im the sender message</p>
          </div>
        </div>
      </div>
      {/* rrecipient messages  */}
      <div className="messenger-message-container">
        <div className="message-chat">
          <p>recieving name</p>
          <div className="messenger-recipient">
            <p>these are the messages to you!</p>
          </div>
        </div>
      </div>
      {/* Triggered when user is typing */}
      <div className="typing-status">
        <p>Someone is typing...</p>
      </div>
    </div>
  )
}

export default MessengerContent