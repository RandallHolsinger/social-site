import React, { useState, useEffect } from 'react'
import './Register.scss'

function Register() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  //check if input values are valid
  const [validUsername, setValidUsername] = useState(null)
  const [validPassword, setValidPassword] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validConfirmEmail, setValidComfirmEmail] = useState(false) 

  const classNameValidation = (bool) => {
    if(bool === true) {
      return 'valid'
    } else if(bool === false) {
      return 'invalid'
    } else {
      return ''
    }
  }

  const checkUsername = () => {
    console.log('here is username', username)
    if(username.length == 0) {
      console.log('I am null')
      setValidUsername(null)
    } else if(username.length < 2) {
      console.log('I am False')
      setValidUsername(false)
    } else if(username.length >= 2 ) {
      console.log('i am True')
      setValidUsername(true)
    }
  }

  const handleRegisterSubmit = () => {
    
  }

  useEffect(() => {
    checkUsername()
  }, [username])

  return(
    <div className="Register">
      <form onSubmit={handleRegisterSubmit}>
        <label htmlFor="username">Enter Username</label>
        <input 
         type="text" 
         id="username"
         value={username}
         onChange={(e) => (setUsername(e.target.value))}
        />
        <span className={classNameValidation(validUsername)}>{validUsername ? 'This is a valid username'  : 'Please enter a valid username'}</span>
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