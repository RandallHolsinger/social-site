import React from 'react'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3000/');

function Logout() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteSocketInstance = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    socket.on('disconnect', () => {
      
    })
    
  }

  const logout = () => {
    axios.post('/auth/user/logout')
    deleteSocketInstance()
    dispatch(clearUser())
    navigate("/")
  }

  return(
    <div className="Logout">
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default Logout