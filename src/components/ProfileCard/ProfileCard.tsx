import React from 'react'
import './ProfileCard.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import FriendStatus from '../FriendStatus/FriendStatus'
import Image from '../Image/Image'

interface ProfileCardProps {
  value: {
    user_id: number,
    first_name: string,
    last_name: string,
    dob?: string,
    city?: string,
    state_province?: string,
    occupation?: string,
    profile_img?: string,
    friend_id?: number,
    source_id?: number,
    target_id?: number,
    friend_status?: string,
    date?: string
  },
  getFriends?: () => Promise<any> 
}

export const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  
  const { value, getFriends } = props

  return(
    <figure className='Profile'>
      {value.profile_img ? 
        <div className='profile-card-user-image-container'>
          <Image image={value.profile_img} style={'profile-card-user-image'} />
        </div>
      : 
        <div className='profile-card-default-image-container'>
          <FontAwesomeIcon icon={faUser} className='profile-card-default-icon' />
        </div>
      }
      <figcaption>
        <Link to={`/Profile/View/${value.user_id}`} className='profile-view-link'>
          <span className="profile-card-name">
            {value.first_name}{' '}{value.last_name}
          </span>
        </Link> 
        <span className="profile-card-city-info">
          {value.city}{' '}{value.state_province}
        </span>
        <span className="profile-card-occupation">
          {value.occupation}
        </span>
      </figcaption>
        {getFriends &&
          <FriendStatus user_id={value.user_id} getFriends={getFriends} />
         }
    </figure>
  )
}

export default ProfileCard