import React from 'react'
import './FriendDelete.scss'
import axios from 'axios'

interface FriendDeleteProps {
  friend_id: number
}

export const FriendDelete: React.FC<FriendDeleteProps> = (props) => {

  const { friend_id } = props

  const deleteFriend = async () => {
    try {
      await axios.delete(`/api/friend/delete/${friend_id}`)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className='FriendDelete'>
      <button onClick={() => deleteFriend()} className='friend-delete-button'>Remove Friend</button>
    </div>
  )
}

export default FriendDelete