import React, { useEffect, useState, useRef} from 'react'
import './GlobalMessenger.scss'
import socket from '../../socketIO/socket'
import GlobalMessage from '../GlobalMessage/GlobalMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'


function GlobalMessenger(props) {
  
  const {setShowMessenger} = props
  
  const userId = useSelector(state => state.user.userId)
  const firstName = useSelector(state => state.user.firstName)
  const lastName = useSelector(state => state.user.lastName)
  const profileImg = useSelector(state => state.user.profileImage)
  const formRef = useRef()


  const [messages, setMessages] = useState([])
  const [globalInput, setGlobalInput] = useState('')

  const leaveChat = () => {
   socket.disconnect()
   setShowMessenger(false)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if(globalInput.trim()) {
      socket.emit('message', {globalInput, userId, firstName, lastName, profileImg})
    }
    formRef.current.reset()
  }

  useEffect(() => {
    socket.on('messageResponse', data => {
      console.log('data on client side recieved =>', data)
      setMessages([...messages, data])
    })
    console.log('messages on state =>', messages)
  }, [socket, messages])

  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])

  let mappedMessages = messages.map((message, index) => {
    return(
      <GlobalMessage key={index} value={message} />
    )
  }) 

  return(
    <div className="GlobalMessenger">
      <div className="global-messenger-header">
        <FontAwesomeIcon icon={faGlobe} className='global-messenger-icon'/>
        <h2>Global Chat</h2>
        <button onClick={() => leaveChat()} className="leave-chat-button">Leave Chat</button>
      </div>
      <div className="messenger-content">
        {mappedMessages}
      </div>
      <div className="global-message-input-container">
        <form onSubmit={(e) => sendMessage(e)} ref={formRef}>
          <input 
            type="text" 
            placeholder='Share whats on your mind...'
            onChange={(e) => setGlobalInput(e.target.value)} 
          />
          <button onClick={(e) => sendMessage(e)}>
            <FontAwesomeIcon icon={faPaperPlane} className='messenger-send-icon' />
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default GlobalMessenger