import react from 'react'
import axios from 'axios'

function FriendDelete(props) {

  const {friend_id} = props

  const deleteFriend = async () => {
    try {
      await axios.delete(`/api/friend/delete/${friend_id}`)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="FriendDelete">
      <button onClick={() => deleteFriend()}>Delete</button>
    </div>
  )
}

export default FriendDelete