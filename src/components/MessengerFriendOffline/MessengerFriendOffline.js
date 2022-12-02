import React, { useEffect } from 'react'
import './MessengerFriendOffline.scss'

function MessengerFriendOffline(props) {
  
  const {value, status} = props
  
  useEffect(() => {
    console.log('here is the value ==>', value)
  }, [])

  return (
    <div className="MessengerFriendOffline">
      <p>{value.first_name}{' '}{value.last_name}</p>
      <div>
        <span>{status}</span>
        <span className={status}></span>
      </div>
    </div>
  )
}

export default MessengerFriendOffline