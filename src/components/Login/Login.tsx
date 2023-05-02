import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/reduxHooks'
import { updateUser } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import './Login.scss'

export const Login: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlertMessage, setShowAlertMessage] = useState(false)
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      console.log('hitting')
      let res = await axios.post('/auth/user/login', {email, password})
      await dispatch(updateUser(res.data))
      navigate("/home")
    } catch(err) {
      setShowAlertMessage(true)
      console.log(err)
    }
    clearInputs()
  }

  return (
    <div className='Login'>
      <form onSubmit={login}>
        <header>
          <FontAwesomeIcon icon={faUserGroup} className='login-header-icon'/>
          <h2>Social Network</h2>
        </header>
        <label htmlFor="email">
          <FontAwesomeIcon icon={faEnvelope} className='login-icons'/>
          Email
        </label>
        <input
          type='text'
          value={email}
          id='email'
          placeholder='Email'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <label htmlFor="password">
          <FontAwesomeIcon icon={faLock} className='login-icons' />
          Password
        </label>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        {showAlertMessage ? 
          <div className='alert-container'>
            <p>The email or password you provided doesn't match any records. Please try again</p>
          </div>
        :
          null
        }
        <div>
          <button type='submit'>Login</button>
          <hr />
          <h4>Not a member yet? Register now</h4>
          <Link to={'/Register'} className='register-link'>Create New Account</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
