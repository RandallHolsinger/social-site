import React, { useState, useEffect } from 'react'
import './UserInfo.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserPen } from '@fortawesome/free-solid-svg-icons'
import UserInfoItem from '../UserInfoItem/UserInfoItem'
import UserEditor from '../UserEditor/UserEditor'

function UserInfo(props) {
  
  const {user} = props

  const [showUserEditor, setShowUserEditor] = useState(false)

  return(
    <div className="UserInfo">
      <section className='user-info-container'>
        <header className='user-info-header'>
            <span className='intro'>
              <FontAwesomeIcon icon={faUser} className='intro-icon'/>
              <h3>Intro</h3>
            </span>
            <span onClick={() => setShowUserEditor(true)}>
              <FontAwesomeIcon icon={faUserPen} className='edit-user-icon'/>
            </span> 
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
      {showUserEditor ?
        <UserEditor />
      :
        null
      }
    </div>
  )
}

export default UserInfo