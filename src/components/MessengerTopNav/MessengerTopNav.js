import React, { useState, useEffect } from 'react'
import './MessengerTopNav.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'

function MessengerTopNav(props) {

  const {socket} = props

  const [onlineFriends, setOnlineFriends] = useState([])
  const userID = useSelector(state => state.user.userId)
  
  
  const checkOnlineStatus = (friends) => {
    console.log('friend list being sent to server ==>', friends)
    socket.emit('checkOnlineStatus', friends)
    socket.on('onlineStatus', (data) => {
      console.log('online Friends are here ==>', data)
      setOnlineFriends(data)
    })
  }

  const getMessengerFriendList = async () => {
    try {
      let res = await axios.get('/api/friends/list')
      checkOnlineStatus(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMessengerFriendList()
  }, [])

  let mappedOnlineFriends = onlineFriends.map((onlineFriend, index) => {
    console.log('online friend object ==>', onlineFriend)
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