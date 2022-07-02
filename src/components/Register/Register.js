import React, { useState, useEffect } from 'react'
import './Register.scss'
import axios from 'axios'

function Register() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  //check if input values are valid
  const [validUsername, setValidUsername] = useState(null)
  const [validPassword, setValidPassword] = useState(null)
  const [validEmail, setValidEmail] = useState(null)
  const [validConfirmEmail, setValidComfirmEmail] = useState(null) 

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
    if(username.length === 0) {
      setValidUsername(null)
    } else if(username.length < 2) {
      setValidUsername(false)
    } else if(username.length >= 2 ) {
      setValidUsername(true)
    }
  }

  const checkPassword = () => {
    if(password.length === 0) {
      setValidPassword(null)
    } else if(password.length < 6) {
      setValidPassword(false)
    } else if(password.length > 6) {
      setValidPassword(true)
    }
  }

  const checkEmail = () => {
    let checkedEmail =  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    if(email.length === 0) {
      setValidEmail(null)
    } else if (checkedEmail) {
       setValidEmail(true)
    } else {
      setValidEmail(false)
    }
  }

  const checkConfirmedEmail = () => {
    if(confirmEmail.length === 0) {
      setValidComfirmEmail(null)
    } else if(confirmEmail === email) {
      setValidComfirmEmail(true)
    } else if (confirmEmail !== email) {
      setValidComfirmEmail(false)
    }
  }

  const registerUser = () => {
    let validForm = validUsername && validPassword && validEmail && validConfirmEmail
    if(validForm) {
      console.log('registering the user')
    } else {
      console.log('Please Fill Out Form!')
    }
  }

  useEffect(() => {
    checkUsername()
    checkPassword()
    checkEmail()
    checkConfirmedEmail()
  }, [username, password, email, confirmEmail])

  return(
    <div className="Register">
      <form onSubmit={registerUser}>
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
        <span className={classNameValidation(validPassword)}>{validPassword ? 'This is a valid Password'  : 'Please enter a valid Password'}</span>
        <label htmlFor="email">Enter Email</label>
        <input 
         type="text" 
         id="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
        <span className={classNameValidation(validEmail)}>{validEmail ? 'This is a valid Email address'  : 'Please enter a valid email address'}</span>
        <label htmlFor="confirm-email">Confirm Email</label>
        <input 
         type="text" 
         id="confirm-email"
         value={confirmEmail}
         onChange={(e) => setConfirmEmail(e.target.value)}
        />
        <span className={classNameValidation(validConfirmEmail)}>{validConfirmEmail ? 'This is a match'  : 'email address doesnt match email entered'}</span>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register