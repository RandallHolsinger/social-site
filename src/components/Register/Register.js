import React, { useState } from 'react'
import './Register.scss'

function Register() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  //check if input values are valid
  const [validUsername, setValidUsername] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validConfirmEmail, setValidComfirmEmail] = useState(false) 

  const checkUsername = () => {
    console.log('here is username', username)
    if(username.length >= 2) {
      setValidUsername(true)
    } else if(username.length < 2) {
      setValidUsername(false)
    } else {
      return null
    }
  }

  const handleRegisterSubmit = () => {
    
  }

  return(
    <div className="Register">
      <form onSubmit={handleRegisterSubmit}>
        <label htmlFor="username">Enter Username</label>
        <input 
         type="text" 
         id="username"
         value={username}
         onChange={(e) => (setUsername(e.target.value), checkUsername())}
        />
        <span className={validUsername ? 'valid' : 'invalid' ? null : null}>{validUsername ? 'This is a valid username'  : 'Please enter a valid username'}</span>
        <label htmlFor="password">Enter Password</label>
        <input 
         type="password" 
         id="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="email">Enter Email</label>
        <input 
         type="text" 
         id="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="confirm-email">Confirm Email</label>
        <input 
         type="text" 
         id="confirm-email"
         value={confirmEmail}
         onChange={(e) => setConfirmEmail(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register