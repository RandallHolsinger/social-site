import React, { useEffect } from 'react'
import './MessengerFriend.scss'

function MessengerFriend(props) {
  
  const {value, status} = props
  
  useEffect(() => {
    console.log('anyone there????')
  }, [])

  return (
    <div className="MessengerFriend">
      <p>{value.first_name}{' '}{value.last_name}</p>
      <div>
        <span>{status}</span>
        <span className={status}></span>
      </div>
    </div>
  )
}

export default MessengerFriend