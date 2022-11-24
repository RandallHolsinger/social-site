import React, { useState, useEffect } from 'react'
import './MessengerTopNav.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'

function MessengerTopNav(props) {

  const {socket} = props

  const [messengerFriendList, setMessengerFriendList] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const [friendsListUpdated, setFriendsListUpdated] = useState(false)

  const userID = useSelector(state => state.user.userId)
  
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
    socket.emit('checkOnlineStatus', messengerFriendList)
    socket.on('onlineStatus', (data) => {
      console.log('online Friends are here ==>', data)
      setOnlineFriends(data)
    })
  }

  useEffect(() => {
    checkOnlineStatus()
  }, [messengerFriendList, socket])

  useEffect(() => {
    getMessengerFriendList()
  }, [])

  let mappedOnlineFriends = onlineFriends.map((onlineFriend, index) => {
    console.log('online friend user id==>', onlineFriend.userId, 'userID on redux ==>', userID)
    return (
      <div key={index} className="messenger-friend-container">
      {onlineFriend.userId == userID ?
         null
        :
        <span>{onlineFriend.firstName}{' '}{onlineFriend.lastName}</span>
      }
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