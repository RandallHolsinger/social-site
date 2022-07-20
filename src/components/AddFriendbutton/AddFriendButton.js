import React, { useState } from 'react'
import axios from 'axios'

function AddFriendButton(props) {

  const [sentFriendRequest, setFriendRequest] = useState(false)

  const sendFriendRequest = async () => {
    const {user_id} = props
    console.log('user id from profile ==>', user_id)
    try {
      axios.post(`/api/friend/request/send/${user_id}`)
      await setFriendRequest(true)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <>
     {sentFriendRequest ? 
       <button>Reqest Sent</button>
     :
       <button onClick={() => sendFriendRequest()}>Add Friend</button>
     }
    </>
  )
}

export default AddFriendButton