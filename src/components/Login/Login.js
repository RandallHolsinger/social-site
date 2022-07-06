import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/actions/userActions'
import { Link } from 'react-router-dom'
import './Login.scss'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async (event) => {
    event.preventDefault()
    try {
      let res = await axios.post('/auth/login', {username, password})
      dispatch(updateUser(res.data))
      navigate("/home")
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="Login">
      <form onSubmit={login}>
      <label>Username</label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button type='submit'>Login</button>
        <Link to={'/Register'}>Register</Link>
      </div>
      </form>
    </div>
  )
}

export default Login
