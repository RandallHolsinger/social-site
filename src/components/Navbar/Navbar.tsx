import React, { useState, useEffect } from 'react'
import './Navbar.scss'
import { useAppSelector } from '../../redux/reduxHooks'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEnvelope, faGlobe, faUser, faUserGroup, faHouseChimney, faAddressCard, faPeopleGroup} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Logout from '../Logout/Logout'
import GlobalMessenger from '../GlobalMessenger/GlobalMessenger'
import Image from '../Image/Image'
import { IUser as IProps } from '../PersonalProfile/PersonalProfile'


export const Navbar: React.FC = () => {
  
  const [user, setUser] = useState<IProps>({})
  const [showMenu, setShowMenu] = useState(false)
  const [showMessenger, setShowMessenger] = useState(false)
  
  const userId = useAppSelector(state => state.user.userId)

  const getUserInfo = async () => {
    try {
      let res = await axios.get(`/api/user/${userId}`)
      setUser(res.data[0])
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [showMenu])
  
  return(
    <div className='Navbar'>
      {showMessenger ? <GlobalMessenger setShowMessenger={setShowMessenger}/> : null} 
      <nav>
        {/* <img src={'/images/???'} className='navbar-logo'/> */}
        <Link to={'/Friends'} className='navbar-link'>
          <span className='navbar-items'>
            <FontAwesomeIcon icon={faUserGroup}className='navbar-icon'/>
            <label>Friends</label>
          </span>
        </Link>
        <Link to={'/MessageInbox'} className='navbar-link'>
          <span className='navbar-items'>
            <FontAwesomeIcon icon={faEnvelope} className='navbar-icon'/>
            <label>Inbox</label>
          </span>
        </Link>
        <span onClick={() => setShowMessenger(true)} className='navbar-items'>
          <FontAwesomeIcon icon={faGlobe} className='navbar-icon'/>
          <label>Live Chat</label>
        </span>
        <span onClick={() => setShowMenu(!showMenu)} className='nav-menu-icon'>
          <FontAwesomeIcon icon={faBars} />
        </span>
      </nav>
        {showMenu ? 
          <div className="nav-menu">
            <ul className='menu-items-container'>
              <header className='nav-menu-header'>
                <div className='nav-menu-user-image-container'>
                  {user.profile_img ?
                    <Image image={user.profile_img} style={'nav-menu-user-image'}/>
                  :
                    <FontAwesomeIcon icon={faUser} className='nav-menu-default-user-image'/>
                  } 
                </div>
                <span className='nav-menu-first-name'>{user.first_name}</span>
                <span className='nav-menu-last-name'>{user.last_name}</span>
                <Logout />
              </header>
              <li>
                <Link to={'/Home'} onClick={() => setShowMenu(false)} className='menu-links'>
                  <FontAwesomeIcon icon={faHouseChimney} className='menu-icon'/>
                  Home
                </Link>
              </li>
              <li>
                <Link to={'/PersonalProfile'} onClick={() => setShowMenu(false)} className='menu-links'>
                  <FontAwesomeIcon icon={faAddressCard} className='menu-icon' />
                  My Profile
                </Link>
              </li>
              <li>
                <Link to={'/MessageInbox'} onClick={() => setShowMenu(false)} className='menu-links'>
                  <FontAwesomeIcon icon={faEnvelope} className='menu-icon' />
                  Messages
                </Link>
              </li>
              <li>
                <Link to={'/Friends'} onClick={() => setShowMenu(false)} className='menu-links'>
                  <FontAwesomeIcon icon={faUserGroup} className='menu-icon' />
                  Friends
                </Link>
              </li>
              <li>
                <Link to={'/Profiles'} onClick={() => setShowMenu(false)} className='menu-links'>
                  <FontAwesomeIcon icon={faPeopleGroup} className='menu-icon' />
                  People
                </Link>
              </li>
            </ul>
          </div>
        :
          null
        }
    </div>
  )
}

export default Navbar