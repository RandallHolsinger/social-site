import React from 'react'
import './FriendRequest.scss'
import FriendAcceptButton from '../FriendAcceptButton/FriendAcceptButton'

function FriendRequest(props) {
  return(
    <div className="FriendRequest">
      <figure>
        <img src={props.value.profile_img ? props.value.profile_img : './images/user-image-default-black.svg'} alt="profile" />
        <figcaption>
          <span>{props.value.first_name}{' '}{props.value.last_name}</span>
          <span>{props.value.city}{' '}{props.value.state}</span>
          <span>Los Angeles, CA</span>
        </figcaption>
        <FriendAcceptButton friend_id={props.value.friend_id} handleRefresh={props.handleRefresh}/>
      </figure>
    </div>
  )
}
export default FriendRequest