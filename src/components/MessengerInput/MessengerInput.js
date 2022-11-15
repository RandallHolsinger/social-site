import React, { useState } from 'react'

function MessengerInput() {

 const [messengerInput, setMessengerInput] = useState('')

  return(
    <div className="MessengerInput">
      <form action="">
        <input type="text" />
        <button>Send</button>
      </form>
    </div>
  )
}

export default MessengerInput