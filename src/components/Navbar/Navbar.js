import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEnvelope, faCommentDots, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import './Navbar.scss'
import Logout from '../Logout/Logout'
import FriendsNotificationBubble from '../FriendsNotificationBubble/FriendsNotificationBubble'
import Messenger from '../Messenger/Messenger'

function Navbar() {

  const [showMenu, setShowMenu] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [showMessenger, setShowMessenger] = useState(false)
  
  const firstName = useSelector(state => state.user.firstName)
  const lastName = useSelector(state => state.user.lastName)

  return(
    <div className={showNav ? 'Navbar' : 'hide-nav'}>
      {showMessenger ? <Messenger setShowMessenger={setShowMessenger}/> : null} 
      <nav>
        <Link to={'/Friends'} className='navbar-items'>
          <span><FontAwesomeIcon icon={faUserGroup}/></span>
          <FriendsNotificationBubble />
        </Link>
        <Link to={'/MessageInbox'} className='navbar-items'>
          <span><FontAwesomeIcon icon={faEnvelope}/></span>
        </Link>
        <span onClick={() => setShowMessenger(true)} className='navbar-items'><FontAwesomeIcon icon={faCommentDots} /></span>
        <span onClick={() => setShowMenu(!showMenu)} className='navbar-items'><FontAwesomeIcon icon={faBars} /></span>
        {showMenu ? 
          <ul>
            <header>
              <span>{`Welcome: \n${firstName} ${lastName}`}</span>
              <Logout />
            </header>
            <li>
              <Link to={'/Home'} onClick={() => setShowMenu(false)} className='dropdown-links'>Home</Link>
            </li>
            <li>
              <Link to={'/PersonalProfile'} onClick={() => setShowMenu(false)} className='dropdown-links'>Profile</Link>
            </li>
            <li>
              <Link to={'/MessageInbox'} onClick={() => setShowMenu(false)} className='dropdown-links'>Messages</Link>
            </li>
            <li>
              <Link to={'/Friends'} onClick={() => setShowMenu(false)} className='dropdown-links'>Friends</Link>
            </li>
            <li>
              <Link to={'/Profiles'} onClick={() => setShowMenu(false)} className='dropdown-links'>People</Link>
            </li>
          </ul>
        :
          null
        }
      </nav>
    </div>
  )
}

export default Navbar