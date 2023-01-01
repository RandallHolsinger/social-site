import React, { useState, useEffect } from 'react'
import './UserInfo.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserPen, faCity, faCakeCandles, faSuitcase, faSchool, faGraduationCap, faC } from '@fortawesome/free-solid-svg-icons'
import UserInfoItem from '../UserInfoItem/UserInfoItem'
import UserEditor from '../UserEditor/UserEditor'

function UserInfo(props) {
  
  const { user } = props

  const [showUserEditor, setShowUserEditor] = useState(false)

  return(
    <div className="UserInfo">
      <section className='user-info-container'>
        <header className='user-info-header'>
            <span className='intro'>
              <FontAwesomeIcon icon={faUser} className='intro-icon'/>
              <h2>Intro</h2>
            </span>
            <span onClick={() => setShowUserEditor(true)}>
              <FontAwesomeIcon icon={faUserPen} className='edit-user-icon'/>
            </span> 
        </header>
        <ul>
          <div className='intro-left-container'>
            <UserInfoItem 
              htmlFor={'city'} 
              icon={<FontAwesomeIcon icon={faCity} className='intro-city-icon'/>} 
              label={'City'} 
              data={user.city} 
            />
            <UserInfoItem 
              htmlFor={'state-region'} 
              icon={<FontAwesomeIcon icon={faCity} className='intro-state-province-icon'/>}
              label={'State / Region'} 
              data={user.state_province} 
            />
            <UserInfoItem 
              htmlFor={'birthday'} 
              icon={<FontAwesomeIcon icon={faCakeCandles} className='intro-birthday-icon'/>} 
              label={'Birthday'} 
              data={user.dob} 
            />
          </div>
          <div className='intro-right-container'>
            <UserInfoItem 
              htmlFor={'occupation'} 
              icon={<FontAwesomeIcon icon={faSuitcase} className='intro-work-icon'/>} 
              label={'Occupation'} 
              data={user.occupation} 
            />
            <UserInfoItem 
              htmlFor={'high-school'} 
              icon={<FontAwesomeIcon icon={faGraduationCap} className='intro-high-school-icon'/>} 
              label={'HighSchool'} 
              data={user.high_school} 
            />
            <UserInfoItem 
              htmlFor={'college'} 
              icon={<FontAwesomeIcon icon={faSchool} className='intro-college-icon'/>} 
              label={'College'} 
              data={user.college} 
            />
          </div>
        </ul>
        <details>
          <summary htmlFor="about-me">About Me</summary>
          <p className='about-me'>{user.about_me}</p>
        </details>
      </section>
      {showUserEditor ?
        <UserEditor user={user} setShowUserEditor={setShowUserEditor} />
      :
        null
      }
    </div>
  )
}

export default UserInfo