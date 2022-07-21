import React from 'react'

function Friend(props) {
  return(
    <>
      <figure>
        <img src={props.value.profile_img ? props.value.profile_img : './images/user-image-default-black.svg'} alt="profile" />
        <figcaption>
          <span>{props.value.first_name}{' '}{props.value.last_name}</span>
          <span>{props.value.city}{' '}{props.value.state}</span>
        </figcaption>
        <button>Accept Request</button>
        <span>Friend Status here if true</span>
      </figure>
    </>
  )
} 

export default Friend