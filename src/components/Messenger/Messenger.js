import React, { useState, useEffect } from 'react'
import './Messenger.scss'
// import MessengerFriendsList from '../MessengerFriendsList/MessengerFriendsList'
import MessengerOnlineUsers from '../MessengerOnlineUsers/MessengerOnlineUsers'
import MessengerInput from '../MessengerInput/MessengerInput'
import MessengerContent from '../MessengerContent/MessengerContent'
import socket from '../../socketIO/socket'


function Messenger(props) {
  
  const {setShowMessenger} = props
  const [selected, setSelected] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})
  
  return(
    <div className="Messenger">
      {/* disable component below when finished creating functionality to do personal messaging with friends
      instead of every online client */}
      {/* <MessengerFriendsList socket={socket} setShowMessenger={setShowMessenger} /> */}
      {selected ?
      <div>
        {selectedUser.firstName}{' '}{selectedUser.lastName}
        <span onClick={() => (setSelected(false), setSelectedUser({}))}>X</span>
      </div> : null}
      {selected ? 
        <div className='message-interface'>
          <MessengerContent socket={socket} setShowMessenger={setShowMessenger}/>
          <MessengerInput socket={socket} selectedUser={selectedUser}/>
        </div>
      :
        <MessengerOnlineUsers 
          socket={socket} 
          setShowMessenger={setShowMessenger} 
          setSelected={setSelected}
          setSelectedUser={setSelectedUser}
        />
      }
    </div>
  )
}

export default Messenger