import react from 'react'
import axios from 'axios'

function FriendDeleteButton(props) {

  const {friend_id} = props

  const deleteFriend = async () => {
    try {
      await axios.delete(`/api/friend/delete/${friend_id}`)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="FriendDeleteButton">
      <button onClick={() => deleteFriend()}>Delete</button>
    </div>
  )
}

export default FriendDeleteButton