import React from 'react'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Logout() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    axios.post('/auth/user/logout')
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