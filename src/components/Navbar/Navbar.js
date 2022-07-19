import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMessage } from '@fortawesome/free-solid-svg-icons'
import './Navbar.scss'
import Logout from '../Logout/Logout'

function Navbar() {

  const [showMenu, setShowMenu] = useState(false)
  const [showNav, setShowNav] = useState(true)
  
  const firstName = useSelector(state => state.user.firstName)
  const lastName = useSelector(state => state.user.lastName)

  const controlNav = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;
    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
    if(bottomOfWindow) {
      setShowNav(false)
    } else {
      setShowNav(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNav)
    return () => {
      window.removeEventListener('scroll', controlNav)
    }
  }, [])

  return(
    <div className={showNav ? 'Navbar' : 'hide-nav'}>
      <nav>
        <img src={'./images/user-image-default-white.svg'} alt="profile"/>
        <span><FontAwesomeIcon icon={faMessage}/></span>
        <span onClick={() => setShowMenu(!showMenu)}><FontAwesomeIcon icon={faBars} /></span>
        {showMenu ? 
          <ul>
            <header>
              <span>{`Welcome: \n${firstName} ${lastName}`}</span>
              <Logout />
            </header>
            <li>
              <Link to={'/Home'} onClick={() => setShowMenu(false)} className='mobile-nav-links'>Home</Link>
            </li>
            <li>
              <Link to={'/PersonalProfile'} onClick={() => setShowMenu(false)} className='mobile-nav-links'>Profile</Link>
            </li>
            <li>
              <Link to={'/Friends'} onClick={() => setShowMenu(false)} className='mobile-nav-links'>Friends</Link>
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