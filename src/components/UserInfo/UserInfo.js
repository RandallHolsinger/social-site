import React from 'react'
import './UserInfo.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserPen } from '@fortawesome/free-solid-svg-icons'

function UserInfo(props) {
  return(
    <div className="UserInfo">
      <section className={props.style}>
         <header>
          <span><FontAwesomeIcon icon={faUser} /></span>
          <button><FontAwesomeIcon icon={faUserPen} />{' '}Edit Info</button> 
         </header>
         <h2>Intro</h2>
         mapped user details here
      </section>
    </div>
  )
}

export default UserInfo