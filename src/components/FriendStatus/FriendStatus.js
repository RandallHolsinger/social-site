import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons'
import FriendAddButton from '../FriendAddButton/FriendAddButton'

function FriendStatus(props) {

  const [friendStatus, setFriendStatus] = useState([])
  const [isLoadingStatus, setIsLoadingStatus] = useState(false)

  const {user_id} = props

  const getFriendStatus = async (user_id) => {
    try {
      let res = await axios.get(`/api/friend/status/${user_id}`)
      setFriendStatus(res.data[0])
    } catch(err) {
      console.log(err)
    }
  }
  
  // const friendStatusLogic = () => {
    //   switch(friendStatus) {
      //     case : 
      //   }
      // }
      
      useEffect(() => {
        getFriendStatus(user_id)
      }, [])

      console.log('friend status', friendStatus)
      
  return(
    <div className="FriendStatus">
      <FriendAddButton user_id={user_id} />
      {friendStatus ? <p>{friendStatus.friend_status}</p> : null}
    </div>
  )
}

export default FriendStatus 