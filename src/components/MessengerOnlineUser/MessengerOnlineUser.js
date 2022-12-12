import React from 'react'
import socket from '../../socketIO/socket'
import './MessengerOnlineUser.scss'

function MessengerOnlineUser(props) {

  const {value, setSelected, setSelectedUser, setRoom} = props

  const handleSelectUser = () => {
    setSelected(true) 
    setSelectedUser(value)
  }
  
  return(
    <div onClick={() => handleSelectUser()} className="MessengerOnlineUser">
      <p>{value.firstName}{' '}{value.lastName}</p>
    </div>
  )
}

export default MessengerOnlineUser