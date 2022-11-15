import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'
import './Register.scss'
import axios from 'axios'

function Register(props) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  //check if input values are valid
  const [validFirstName, setValidFirstName] = useState(null)
  const [validLastName, setValidLastName] = useState(null)
  const [validEmail, setValidEmail] = useState(null)
  const [validConfirmEmail, setValidComfirmEmail] = useState(null)
  const [validPassword, setValidPassword] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const clearInputs = () => {
    setFirstName('')
    setLastName('')
    setPassword('')
    setEmail('')
    setConfirmEmail('')
  }
  
  const classNameValidation = (bool) => {
    if(bool === true) {
      return 'valid'
    } else if(bool === false) {
      return 'invalid'
    } else {
      return ''
    }
  }

  const checkFirstName = () => {
    if(firstName.length === 0  ) {
      setValidFirstName(null)
    } else if(firstName.length < 2) {
      setValidFirstName(false)
    } else if(firstName.length >= 2 ) {
      setValidFirstName(true)
    }
  }
  const checkLastName = () => {
    if(lastName.length === 0  ) {
      setValidLastName(null)
    } else if(lastName.length < 2) {
      setValidLastName(false)
    } else if(lastName.length >= 2 ) {
      setValidLastName(true)
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

  const registerUser = async (event) => {
    event.preventDefault()
    const {socket} = props
    let validForm = validFirstName && validLastName && validEmail && validConfirmEmail && validPassword
    if(validForm) {
      try {
        let res = await axios.post('/auth/user/register', {firstName, lastName, email, password})
        console.log('registered the user', res)
        dispatch(updateUser(res.data))
        navigate('/Home')
      } catch(err) {
        console.log(err)
      }
    }
    clearInputs()
  }

  useEffect(() => {
    checkFirstName()
    checkLastName()
    checkEmail()
    checkPassword()
    checkConfirmedEmail()
  }, [firstName, lastName, email, password, confirmEmail])

  
  return(
    <div className="Register">
      <form onSubmit={registerUser}>
        <label htmlFor="first-name">First Name</label>
        <input 
         type="text" 
         id="first-name"
         value={firstName}
         onChange={(e) => (setFirstName(e.target.value))}
        />
        <span className={classNameValidation(validFirstName)}>{validFirstName ? 'This is a valid first name'  : 'Please enter a valid first name'}</span>
        <label htmlFor="last-name">Last Name</label>
        <input 
         type="text" 
         id="last-name"
         value={lastName}
         onChange={(e) => (setLastName(e.target.value))}
        />
        <span className={classNameValidation(validLastName)}>{validLastName ? 'This is a valid last name'  : 'Please enter a valid last name'}</span>
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