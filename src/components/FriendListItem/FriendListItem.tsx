import React from 'react'
import './FriendListItem.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Image from '../Image/Image'
import { IFriend as IProps } from '../Friends/Friends'

interface FriendListItemProps {
  friend: IProps,
  handleSelectedFriend: (user_id: number, first_name: string, last_name: string) => void
}

export const FriendListItem: React.FC<FriendListItemProps> = (props) => {
  
  const { friend, handleSelectedFriend } = props

  return (
    <div className="friend-list-item" onClick={() => handleSelectedFriend(friend.user_id, friend.first_name, friend.last_name)} >
        <div className="select-friend-img-container">
          {friend.profile_img ?
            <Image image={friend.profile_img} style={'friend-list-profile-img'} />
          :
            <FontAwesomeIcon icon={faUser} className='friend-list-default-img' /> 
          }
        </div>
        <span className='dropdown-list-name'>{friend.first_name}{' '}{friend.last_name}</span>
      </div>
  )
}

export default FriendListItem