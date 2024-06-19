import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUser, faEnvelope, faKey, faK} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './Register.scss'
import axios from 'axios'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  //Check if input values are valid
  const [validFirstName, setValidFirstName] = useState(false)
  const [validLastName, setValidLastName] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validConfirmPassword, setValidConfirmPassword] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  //Changes style based off input values
  const [firstNameStatus, setFirstNameStatus] = useState('')
  const [lastNameStatus, setLastNameStatus] = useState('')
  const [passwordStatus, setPasswordStatus] = useState('')
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState('')
  const [emailStatus, setEmailStatus] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const clearInputs = () => {
    setFirstName('')
    setLastName('')
    setPassword('')
    setEmail('')
    setConfirmPassword('')
  }

  const checkFirstName = () => {
    if(firstName.length === 0  ) {
      setFirstNameStatus('default')
    } else if(firstName.length < 2) {
      setValidFirstName(false)
      setFirstNameStatus('invalid')
    } else if(firstName.length >= 2 ) {
      setValidFirstName(true)
      setFirstNameStatus('valid')
    }
  }
  const checkLastName = () => {
    if(lastName.length === 0  ) {
      setLastNameStatus('default')
    } else if(lastName.length < 2) {
      setValidLastName(false)
      setLastNameStatus('invalid')
    } else if(lastName.length >= 2 ) {
      setValidLastName(true)
      setLastNameStatus('valid')
    }
  }

  const checkPassword = () => {
    if(password.length === 0) {
      setPasswordStatus('default')
    } else if(password.length < 6) {
      setValidPassword(false)
      setPasswordStatus('invalid')
    } else if(password.length > 6) {
      setValidPassword(true)
      setPasswordStatus('valid')
    }
  }

  const checkEmail = () => {
    let checkedEmail =  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    if(email.length === 0) {
      setEmailStatus('default')
    } else if (checkedEmail) {
       setValidEmail(true)
       setEmailStatus('valid')
    } else {
      setValidEmail(false)
      setEmailStatus('invalid')
    }
  }

  const checkConfirmedPassword = () => {
    if(confirmPassword.length === 0) {
      setConfirmPasswordStatus('default')
    } else if(confirmPassword === password) {
      setValidConfirmPassword(true)
      setConfirmPasswordStatus('valid')
    } else if (confirmPassword !== password) {
      setValidConfirmPassword(false)
      setConfirmPasswordStatus('invalid')
    }
  }

  const registerUser = async (event) => {
    event.preventDefault()
    let validForm = validFirstName && validLastName && validEmail && validConfirmPassword && validPassword 
    if(validForm) {
      try {
        let res = await axios.post('/auth/user/register', {firstName, lastName, email, password})
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
    checkPassword()
    checkEmail()
    checkConfirmedPassword()
  }, [firstName, lastName, password, email, confirmPassword])
  
  return(
    <div className="Register">
      <form onSubmit={registerUser}>
        <header>
          <Link to={'/'} className='back-arrow'>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h2>Registeration Form</h2>
        </header>
        <label htmlFor="first-name">
          <FontAwesomeIcon icon={faUser} className='label-icons' />{' '}
          First Name
        </label>
        <input 
         placeholder='First Name'
         type="text" 
         id="first-name"
         value={firstName}
         onChange={(e) => (setFirstName(e.target.value))}
        />
        <span className={firstNameStatus}>{validFirstName ? 'This is a valid First Name' : 'Please enter a valid First Name' }</span>
        <label htmlFor="last-name">
          <FontAwesomeIcon icon={faUser} className='label-icons'/>
          Last Name
        </label>
        <input 
         placeholder='Last Name' 
         type="text" 
         id="last-name"
         value={lastName}
         onChange={(e) => (setLastName(e.target.value))}
        />
        <span className={lastNameStatus}>{validLastName ? 'This is a valid Last Name' : 'Please enter a valid Last Name' }</span>
        <label htmlFor="password">
          <FontAwesomeIcon icon={faKey} className='label-icons' />
          Create A Password
        </label>
        <input  
         type="password" 
         placeholder='Password'
         id="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
        <span className={passwordStatus}>{validPassword ? 'This is a valid Password' : 'Please enter a valid Password'}</span>
        <label htmlFor="confirm-password">
          <FontAwesomeIcon icon={faKey} className='label-icons' />
          Confirm Password
        </label>
        <input 
         type="password" 
         placeholder='Confirm Email'
         id="confirm-password"
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span className={confirmPasswordStatus}>{validConfirmPassword ? 'This is a match' : "Please Confirm Password"}</span>
        <label htmlFor="email">
          <FontAwesomeIcon icon={faEnvelope} className='label-icons' />
          Enter Email
        </label>
        <input 
         type="text" 
         placeholder='Email'
         id="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
        <span className={emailStatus}>{validEmail ? 'This is a valid Email address' : 'Please enter a valid Email Address'}</span>
        <div className="register-button">
        <Link to={'/'} className='cancel-registration'>
            Cancel
        </Link>
        <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register