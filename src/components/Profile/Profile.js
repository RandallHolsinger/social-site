import React from 'react'
import './Profile.scss'
import FriendAddButton from '../FriendAddButton/FriendAddButton'

function Profile(props) {
  return(
    <div className="Profile">
      <figure>
        <img src={props.value.profile_img ? props.value.profile_img : './images/user-image-default-black.svg'} alt="profile"/>
        <figcaption>
          {props.value.first_name}{' '}{props.value.last_name}
          <span>{props.value.city}{' '}{props.value.state}</span>
          <span>Los Angeles, CA</span>
        </figcaption>
          <FriendAddButton user_id={props.value.user_id} />
      </figure>
    </div>
  )
}

export default Profile