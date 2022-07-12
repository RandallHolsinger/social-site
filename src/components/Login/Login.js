import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import './Login.scss'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const userId = useSelector(state => state.user.userId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async (event) => {
    event.preventDefault()
    try {
      let res = await axios.post('/auth/user/login', {username, password})
      dispatch(updateUser(res.data))
      navigate("/home")
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='Login'>
      <form onSubmit={login}>
      <label>Username</label>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password</label>
      <input
        type='password'
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
