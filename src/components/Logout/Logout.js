import React from 'react'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Logout() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    axios.post('/auth/user/logout')
    localStorage.removeItem('userId')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
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