import React from 'react'
import './Logout.scss'
import { useAppDispatch } from '../../redux/reduxHooks'
import { clearUser } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export const Logout: React.FC = () => {
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const logout = () => {
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