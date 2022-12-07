import React, { useState, useEffect } from 'react'
import './MessengerOnlineUsers.scss'
import MessengerOnlineUser from '../MessengerOnlineUser/MessengerOnlineUser'
import { useSelector } from 'react-redux'

function MessengerOnlineUsers(props) {

  const {socket, setShowMessenger, setSelected, setSelectedUser} = props

  const [onlineUsers, setOnlineUsers] = useState([])
  const [isOnline, setIsOnline] = useState(false)

  const userID = useSelector(state => state.userId)
  
  const getOnlineUsers = () => {
    console.log('hitting the function!')
    let text = 'getting online users.'
    socket.emit('getOnlineUsers', text)
      socket.on('onlineUsersList', (onlineUsers) => {
        setOnlineUsers(onlineUsers)
      })
      console.log('onlineUsers on state', onlineUsers)
      setIsOnline(true)
  }

  
  useEffect(() => {
    socket.connect()
    getOnlineUsers()
  }, [])

  let mappedOnlineUsers = onlineUsers.map(user => {
    console.log('hitting map', user)
    if(user.userId != userID) {
      return (
        <MessengerOnlineUser 
          key={user.userId} 
          value={user} 
          setSelected={setSelected} 
          setSelectedUser={setSelectedUser}/>
      )
    } else {
      return null
    }
  })

  return(
    <div className="MessengerOnlineUsers">
      <div className='online-users-header'>
        <h3>Online Users</h3>
        <span onClick={() => setShowMessenger(false)}>X</span>
      </div>
      {isOnline ?
        <div className='online-users-constainer'>
          {mappedOnlineUsers}
        </div>
      :
        <div className='no-online-container'>
          <h3>No Users Online</h3>
        </div>
      }
    </div>
  )
}

export default MessengerOnlineUsers