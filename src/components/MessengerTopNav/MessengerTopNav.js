import React, { useState, useEffect } from 'react'
import './MessengerTopNav.scss'
import axios from 'axios'

function MessengerTopNav(props) {

  const {socket} = props

  const [messengerFriendList, setMessengerFriendList] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const [friendsListUpdated, setFriendsListUpdated] = useState(false)
  
  const getMessengerFriendList = async () => {
    try {
      let res = await axios.get('/api/friends/list')
      setMessengerFriendList(res.data)
      setFriendsListUpdated(true)
      console.log(messengerFriendList)
    } catch(err) {
      console.log(err)
    }
  }

  const checkOnlineStatus = () => {
    setFriendsListUpdated(true)
    console.log('friend list being sent to server ==>', messengerFriendList)
    socket.emit('checkOnlineStatus', {messengerFriendList})
    socket.on('onlineStatus', (data) => {
      console.log('online Friends are here ==>', data)
      setOnlineFriends(data)
    })
  }

  useEffect(() => {
    checkOnlineStatus()
  }, [messengerFriendList])

  useEffect(() => {
    getMessengerFriendList()
  }, [socket])

  let mappedOnlineFriends = onlineFriends.map(onlineFriend => {
    return (
      <div key={onlineFriend.friend_id} className="messenger-friend-container">
        <span>{onlineFriend.first_name}{' '}{onlineFriend.last_name}</span>
      </div>
    )
  })


  return(
    <div className="MessengerTopNav">
      {mappedOnlineFriends}
    </div>
  )
}

export default MessengerTopNav 