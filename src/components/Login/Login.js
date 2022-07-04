import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="Login">
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
        <button>Login</button>
        <Link to={'/Register'}>Register</Link>
      </div>
    </div>
  )
}

export default Login
