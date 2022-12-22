import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import './Login.scss'

function Login(props) {

  const {socket} = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlertMessage, setShowAlertMessage] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const setLocalStorageForSocket = (data) => {
    console.log('data setting storage ==>', data)
    localStorage.setItem('userId', data.user_id)
    localStorage.setItem('firstName', data.first_name)
    localStorage.setItem('lastName', data.last_name)
  }

  const socketLogin = async () => {
    socket.on('connect', () => {
    console.log('client login socket id ==>', socket.id)
    socket.emit('login', {
      userId: localStorage.getItem('userId'), 
      firstName: localStorage.getItem('firstName') , 
      lastName: localStorage.getItem('lastName'), 
      socketID: socket.id
    })
    socket.connect()
    })
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      console.log('hitting')
      let res = await axios.post('/auth/user/login', {email, password})
      console.log(res.errorMessage)
      await dispatch(updateUser(res.data))
      socket.connect()
      setLocalStorageForSocket(res.data)
      socketLogin()
      navigate("/home")
    } catch(err) {
      setShowAlertMessage(true)
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">
          <FontAwesomeIcon icon={faLock} className='login-icons' />
          Password
        </label>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
