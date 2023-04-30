import React, {useState, useEffect} from 'react'
import './FriendStatus.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import FriendAdd from '../FriendAdd/FriendAdd'
import { useAppSelector } from '../../redux/reduxHooks'
import FriendAccept from '../FriendAccept/FriendAccept'
import FriendDelete from '../FriendDelete/FriendDelete'

interface FriendStatusProps {
  user_id: number
}

interface IFriendStatus {
  friend_id: number,
  source_id: number,
  target_id: number,
  friend_status: string
}

export const FriendStatus: React.FC<FriendStatusProps> = (props) => {

  const [friendStatus, setFriendStatus] = useState<IFriendStatus>()
  
  const currentUserId =  useAppSelector(state => state.user.userId)
  
  const { user_id } = props

  const getFriendStatus = async (user_id: number) => {
    try {
      let res = await axios.get(`/api/friend/status/${user_id}`)
      setFriendStatus(res.data[0])
    } catch(err) {
      console.log(err)
    }
    console.log('friend status here =>', friendStatus)
  }
  
  const friendStatusLogic = (): JSX.Element | undefined => {
    if(friendStatus) {
      if(friendStatus.source_id === currentUserId && friendStatus.friend_status !== 'friend') {
        return (
          <span className='request-sent'>
            <FontAwesomeIcon icon={faPaperPlane} className='request-sent-icon' />
            Request Sent
          </span>
        )
      } else if(friendStatus.target_id === currentUserId && friendStatus.friend_status !== 'friend') {
        return <FriendAccept user_id={user_id} friend_id={friendStatus.friend_id} />
      } 
      else if(friendStatus.friend_status === 'friend') {
        return(
          <div className='friend-tag-container'>
            <span className='friend-tag'>
              <FontAwesomeIcon icon={faUserGroup} className='friend-tag-icon'/>
              Friends
            </span>
            <FriendDelete friend_id={friendStatus.friend_id}/>
          </div>
        )
      } 
    } else {
      return <FriendAdd user_id={user_id} />
    }
  }
      
  useEffect(() => {
    getFriendStatus(user_id)
  }, [user_id])
      
  return(
    <div className="FriendStatus">
      {friendStatusLogic()}
    </div>
  )
}

export default FriendStatus 