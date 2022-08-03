import React, { useState } from 'react'

function MessageCreate() {

  const [subjectInput, setSubjectInput] = useState('')
  const [messageInput, setMessageInput] = useState('')

  return(
    <div className="MessageCreate">
      <input 
        type="text"
        placeholder='Subject'
        value={subjectInput}
        onChange={(e) => setSubjectInput(e.target.value)}
      />
      <textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder='Message...' />
    </div>
  )
}

export default MessageCreate