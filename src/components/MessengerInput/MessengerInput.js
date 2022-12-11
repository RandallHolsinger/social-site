import React, { useState } from 'react'

function MessengerInput(props) {

  const {socket, selectedUser} = props

  const [message, setMessage] = useState('')
 
  const sendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && localStorage.getItem('userId')) {
     socket.emit('privateMessage', {
       text: message,
       userId: localStorage.getItem('userId'),
       firstName: localStorage.getItem('firstName'),
       lastName: localStorage.getItem('lastName'),
       targetSocketID: selectedUser.socketID,
       socketID: socket.id,
     });
   }
   setMessage('')
  }

  const handleTyping = () => {
    socket.emit('typing', `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')} is typing...`)
    setTimeout(() => {
      socket.emit('typing', '')
    }, 3000)
  }
 

  return(
    <div className="MessengerInput">
      <form onSubmit={(e) => sendMessage(e)}>
        <input
          type='text'
          value={message}
          placeholder='Write Message'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button onClick={(e) => sendMessage(e)}>Send</button>
      </form>
    </div>
  )
}

export default MessengerInput