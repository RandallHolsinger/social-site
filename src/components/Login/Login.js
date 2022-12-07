import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import './Login.scss'

function Login(props) {

  const {socket} = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
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
      await dispatch(updateUser(res.data))
      socket.connect()
      setLocalStorageForSocket(res.data)
      socketLogin()
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
