import React, { useState, useEffect } from 'react'
import './UserInfo.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserPen } from '@fortawesome/free-solid-svg-icons'
import UserInfoItem from '../UserInfoItem/UserInfoItem'

function UserInfo(props) {
  
  const {user} = props

  return(
    <div className="UserInfo">
      <section>
        <header>
         <span><FontAwesomeIcon icon={faUser} /></span>
         <button><FontAwesomeIcon icon={faUserPen} />{' '}Edit Info</button> 
         <h2>Intro</h2>
        </header>
        <ul>
          {/* rewrite logic to be able to pass conditional and user details in reuseable component */}
          <UserInfoItem htmlFor={'first-name'} label={'First Name:'} data={user.first_name} />
          <UserInfoItem htmlFor={'last-name'} label={'Last Name:'} data={user.last_name} />
          <UserInfoItem htmlFor={'city'} label={'City:'} data={user.city} />
          <UserInfoItem htmlFor={'state-region'} label={'State / Region:'} data={user.state} />
          <UserInfoItem htmlFor={'birthday'} label={'Birthday:'} data={user.dob} />
          <li>
            <details>
              <summary htmlFor="about-me">About Me</summary>
              <span>{user.about_me}</span>
            </details>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default UserInfo