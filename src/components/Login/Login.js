import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Login.scss'

function Login(props) {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const socketUserId = useSelector(state => state.user.userId)
  const socketFirstName = useSelector(state => state.user.firstName)
  const socketLastName = useSelector(state => state.user.lastName)
  
  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const setLocalStorageForSocket = () => {
    const {socket} = props
    localStorage.setItem('userId', socketUserId)
    localStorage.setItem('firstName', socketFirstName)
    localStorage.setItem('lastName', socketLastName)
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      console.log('hitting')
      let res = await axios.post('/auth/user/login', {email, password})
      dispatch(updateUser(res.data))
      setLocalStorageForSocket()
      navigate("/home")
    } catch(err) {
      console.log(err)
      clearInputs()
    }
  }

  return (
    <div className='Login'>
      <form onSubmit={login}>
      <label htmlFor='email'>Email</label>
      <input
        type='text'
        value={email}
        id='email'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button type='submit'>Login</button>
        <Link to={'/Register'} className='register-link'>Register</Link>
      </div>
      </form>
    </div>
  )
}

export default Login
