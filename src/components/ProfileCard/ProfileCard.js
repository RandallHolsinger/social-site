import React from 'react'
import './ProfileCard.scss'
import FriendStatus from '../FriendStatus/FriendStatus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function ProfileCard(props) {
  
  const {value} = props

  return(
    <figure className='Profile'>
      {value.profile_img ? 
        <div className='profile-card-user-image-container'>
          <img src={`uploads/images/${value.profile_img}`} alt='profile' className='profile-card-user-image'/>
        </div>
      : 
        <div className='profile-card-default-image-container'>
          <FontAwesomeIcon icon={faUser} className='profile-card-default-icon' />
        </div>
      }
      <figcaption>
        <span className="profile-card-name">
          {value.first_name}{' '}{value.last_name}
        </span>
        <span className="profile-card-city-info">
          {value.city}{' '}{value.state_province}
        </span>
        <span className="profile-card-occupation">
          {value.occupation}
        </span>
      </figcaption>
        <FriendStatus user_id={value.user_id} />
    </figure>
  )
}

export default ProfileCard