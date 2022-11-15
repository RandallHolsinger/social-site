import React, { useState, useEffect } from 'react'
import './Messenger.scss'
// import MessengerSidebar from '../MessengerSidebar/MessengerSidebar'
import MessengerTopNav from '../MessengerTopNav/MessengerTopNav'
import MessengerInput from '../MessengerInput/MessengerInput'
import MessengerContent from '../MessengerContent/MessengerContent'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3000/', {autoConnect: false});


function Messenger(props) {
  
  const {setShowMessenger} = props
  
  useEffect(() => {

  }, [])
  
  return(
    <div className="Messenger">
      <MessengerTopNav socket={socket} />
      <div className="sidebar-container">
        {/* <MessengerSidebar socket={socket}/>  */}
      </div>
      <div className='message-interface'>
        <MessengerContent socket={socket} setShowMessenger={setShowMessenger}/>
        <MessengerInput socket={socket}/>
      </div>
    </div>
  )
}

export default Messenger