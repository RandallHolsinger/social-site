import React, { useState, useEffect } from 'react'
import './UserInfo.scss'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserPen } from '@fortawesome/free-solid-svg-icons'
import UserInfoItem from '../UserInfoItem/UserInfoItem'

function UserInfo(props) {

  const [user, setUser] = useState({})

  const GetUserInfo = async(user_id) => {
    console.log('user id here ==>', user_id)
    if(user_id !== 0) {
      try {
        let res = await axios.get(`/api/user/${user_id}`)
        console.log(res)
        setUser(res.data[0])
      } catch(err) {
        console.log(err)
      }
    }
    console.log(user)
  }

  useEffect(() => {
    GetUserInfo(props.user_id)
  }, [props.user_id])

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