import React from 'react'
import './FriendDelete.scss'
import axios from 'axios'

interface FriendDeleteProps {
  friend_id: number,
  getFriends: () => Promise<void>
}

export const FriendDelete: React.FC<FriendDeleteProps> = (props) => {

  const { friend_id, getFriends } = props

  const deleteFriend = async () => {
    try {
      await axios.delete(`/api/friend/delete/${friend_id}`)
      getFriends()
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