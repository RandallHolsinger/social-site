import React, { useState } from 'react'
import './UserInfo.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserPen, faCity, faCakeCandles, faSuitcase, faSchool, faGraduationCap} from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '../../redux/reduxHooks'
import UserEditor from '../UserEditor/UserEditor'
import UserInfoItem from '../UserInfoItem/UserInfoItem'
import { IUser as IProps } from '../PersonalProfile/PersonalProfile'

interface UserInfoProps {
  user: IProps
}

export const UserInfo:  React.FC<UserInfoProps> = (props) => {
  
  const { user } = props

  const [showUserEditor, setShowUserEditor] = useState(false)

  const userId = useAppSelector(state => state.user.userId)

  return(
    <div className="UserInfo">
      <section className='user-info-container'>
        <header className='user-info-header'>
            <span className='intro'>
              <FontAwesomeIcon icon={faUser} className='intro-icon'/>
              <h2>Intro</h2>
            </span>
            {user.user_id === userId ?
              <span onClick={() => setShowUserEditor(true)}>
                <FontAwesomeIcon icon={faUserPen} className='edit-user-icon'/>
              </span> 
            :
              null
            }
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
          <summary>About Me</summary>
          <p className='about-me'>{user.about_me}</p>
        </details>
      </section>
      {showUserEditor ?
        <UserEditor setShowUserEditor={setShowUserEditor} />
      :
        null
      }
    </div>
  )
}

export default UserInfo