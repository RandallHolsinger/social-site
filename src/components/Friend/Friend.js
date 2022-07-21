import React from 'react'
import './Friend.scss'

function Friend(props) {
  return(
    <div className="Friend">
      <figure>
        <img src={props.value.profile_img ? props.value.profile_img : './images/user-image-default-black.svg'} alt="profile" />
        <figcaption>
          <span>{props.value.first_name}{' '}{props.value.last_name}</span>
          <span>{props.value.city}{' '}{props.value.state}</span>
          <span>Los Angeles, CA</span>
        </figcaption>
        <button>Accept</button>
        <span>Is Friend</span>  
      </figure>
    </div>
  )
} 

export default Friend