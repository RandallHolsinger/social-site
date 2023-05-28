import React, { useEffect, useState, useRef, SetStateAction} from 'react'
import './GlobalMessenger.scss'
import socket from '../../socketIO/socket'
import GlobalMessage from '../GlobalMessage/GlobalMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '../../redux/reduxHooks'

interface GlobalMessengerProps {
  setShowMessenger: React.Dispatch<SetStateAction<boolean>>
}

export interface SocketMessageData {
  globalInput: string,
  userId: number,
  firstName: string,
  lastName: string,
  profileImg? : string
}


export const GlobalMessenger: React.FC<GlobalMessengerProps> = (props) => {
  
  const { setShowMessenger } = props
  
  const userId = useAppSelector(state => state.user.userId)
  const firstName = useAppSelector(state => state.user.firstName)
  const lastName = useAppSelector(state => state.user.lastName)
  const formRef = useRef<HTMLFormElement | null>(null)


  const [messages, setMessages] = useState<SocketMessageData[]>([])
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [globalInput, setGlobalInput] = useState('')

  const leaveChat = () => {
   socket.disconnect()
   setShowMessenger(false)
  }

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(globalInput.trim()) {
      socket.emit('message', {globalInput, userId, firstName, lastName})
    }
    setGlobalInput('')
    formRef.current?.reset()
  }

  useEffect(() => {
    socket.on('messageResponse', (data: SocketMessageData) => {
      setMessages([...messages, data])
    })
  }, [socket, messages])

  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on('onlineCount', (number: number) => {
      setOnlineUsers(number)
    })
  }, [socket])

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
      <span className='online-user-count'>Users Online: {onlineUsers} </span>
        {mappedMessages}
      </div>
      <div className="global-message-input-container">
        <form onSubmit={(e) => sendMessage(e)} ref={formRef}>
          <input 
            type="text" 
            placeholder='Share whats on your mind...'
            value={globalInput}
            autoComplete='True'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalInput(e.target.value)} 
          />
          <button type='submit'>
            <FontAwesomeIcon icon={faPaperPlane} className='messenger-send-icon' />
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default GlobalMessenger