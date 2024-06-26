import axios from 'axios'
import './Login.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/reduxHooks'
import { updateUser } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'


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
      let res = await axios.post('/auth/user/login', {email, password})
      await dispatch(updateUser(res.data))
      navigate("/home")
    } catch(err) {
      setShowAlertMessage(true)
      console.log(err)
    }
    clearInputs()
  }

  const guestLogin = async () => {
    try {
      let res = await axios.post('/auth/user/login/guest')
      await dispatch(updateUser(res.data))
      navigate("/home")
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='Login'>
      <header>
        <FontAwesomeIcon icon={faUserGroup} className='login-header-icon'/>
        <h2>Socialyze</h2>
      </header>
      <form onSubmit={login}>
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
          <h5>Employers / Recruiters <span onClick={() => guestLogin()}>Guest Login</span></h5>
          <hr />
          <h4>Don't have an account? Click Below</h4>
          <Link to={'/Register'} className='register-link'>Create New Account</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
