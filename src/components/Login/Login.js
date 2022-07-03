import React, { useState } from 'react'
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
        <button>Register</button>
      </div>
    </div>
  )
}

export default Login
