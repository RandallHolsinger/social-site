import React from 'react'
import './Logout.scss'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3000/', {autoConnect: false});

function Logout() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteSocketInstance = () => {
    console.log('hitting delete socket instance start')
    localStorage.removeItem('userId')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    socket.on('disconnect', () => {
      console.log('hitting front end logout')
      socket.disconnect()
    })
    console.log('hitting delete socket instance start')
  }
  
  const logout = () => {
    deleteSocketInstance()
    axios.post('/auth/user/logout')
    dispatch(clearUser())
    navigate("/")
  }

  return(
    <div className="Logout">
      <button onClick={() => logout()} className='logout-button'>
        <FontAwesomeIcon icon={faRightFromBracket} className='logout-icon' />
        Logout
      </button>
    </div>
  )
}

export default Logout