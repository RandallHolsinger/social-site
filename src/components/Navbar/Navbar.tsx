import React, { useState } from 'react'
import './Navbar.scss'
import { useAppSelector } from '../../redux/reduxHooks'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEnvelope, faGlobe, faUser, faUserGroup, faHouseChimney, faAddressCard, faPeopleGroup} from '@fortawesome/free-solid-svg-icons'
import OutsideClickHandler from 'react-outside-click-handler'
import Logout from '../Logout/Logout'
import FriendsNotificationBubble from '../FriendsNotificationBubble/FriendsNotificationBubble'
import GlobalMessenger from '../GlobalMessenger/GlobalMessenger'

export const Navbar: React.FC = () => {

  const [showMenu, setShowMenu] = useState(false)
  const [showMessenger, setShowMessenger] = useState(false)
  
  const firstName = useAppSelector(state => state.user.firstName)
  const lastName = useAppSelector(state => state.user.lastName)
  const profileImage = useAppSelector(state => state.user.profileImage)

  return(
    <div className='Navbar'>
      {showMessenger ? <GlobalMessenger setShowMessenger={setShowMessenger}/> : null} 
      <nav>
        <Link to={'/Friends'} className='navbar-items'>
          <span><FontAwesomeIcon icon={faUserGroup}/></span>
          <FriendsNotificationBubble />
        </Link>
        <Link to={'/MessageInbox'} className='navbar-items'>
          <span><FontAwesomeIcon icon={faEnvelope}/></span>
        </Link>
        <span onClick={() => setShowMessenger(true)} className='navbar-items'>
          <FontAwesomeIcon icon={faGlobe} />
        </span>
        <span onClick={() => setShowMenu(!showMenu)} className='nav-menu-icon'>
          <FontAwesomeIcon icon={faBars} />
        </span>
      </nav>
        {showMenu ? 
          <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
            <div className="nav-menu">
              <ul className='menu-items-container'>
                <header className='nav-menu-header'>
                  <div className='nav-menu-user-image-container'>
                    {profileImage ?
                      <img src={require(`../../../server/uploads/images/${profileImage}`)} className='nav-menu-user-image' alt='profile' />
                    :
                      <FontAwesomeIcon icon={faUser} className='nav-menu-default-user-image'/>
                    } 
                  </div>
                  <span className='nav-menu-first-name'>{firstName}</span>
                  <span className='nav-menu-last-name'>{lastName}</span>
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
          </OutsideClickHandler>
        :
          null
        }
    </div>
  )
}

export default Navbar