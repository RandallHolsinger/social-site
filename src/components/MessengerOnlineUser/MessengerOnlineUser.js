import React, { useEffect } from 'react'
import './MessengerOnlineUser.scss'

function MessengerOnlineUser(props) {

  const {value, setSelected, setSelectedUser} = props

  useEffect(() => {
    console.log('hitting here')
  }, [])
  
  return(
    <div onClick={() => (setSelected(true), setSelectedUser(value))} className="MessengerOnlineUser">
      <p>{value.firstName}{' '}{value.lastName}</p>
    </div>
  )
}

export default MessengerOnlineUser