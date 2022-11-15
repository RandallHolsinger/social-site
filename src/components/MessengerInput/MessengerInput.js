import React, { useState } from 'react'

function MessengerInput(props) {

 const [messengerInput, setMessengerInput] = useState('')

 const sendMessage = (e) => {
  e.preventDefault()
  const {socket} = props
  if(messengerInput.trim && localStorage.getItem('user')) {
    socket.emit('message', {
      text: messengerInput,
      name: localStorage.getItem('user'),
      id: socket.id,
      socketID: socket.id
    })
  }
  setMessengerInput('')
 }

  return(
    <div className="MessengerInput">
      <form onSubmit={(e) => sendMessage(e)}>
        <input type="text" />
        <button>Send</button>
      </form>
    </div>
  )
}

export default MessengerInput