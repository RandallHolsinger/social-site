import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUser, faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './Register.scss'
import axios from 'axios'

function Register(props) {
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  
  //Check if input values are valid
  const [validFirstName, setValidFirstName] = useState(false)
  const [validLastName, setValidLastName] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validConfirmEmail, setValidComfirmEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  //Changes style based off input values
  const [firstNameStatus, setFirstNameStatus] = useState('')
  const [lastNameStatus, setLastNameStatus] = useState('')
  const [passwordStatus, setPasswordStatus] = useState('')
  const [emailStatus, setEmailStatus] = useState('')
  const [confirmEmailStatus, setConfirmEmailStatus] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const socketUserId = useSelector(state => state.user.userId)
  const socketFirstName = useSelector(state => state.user.firstName)
  const socketLastName = useSelector(state => state.user.lastName)

  const clearInputs = () => {
    setFirstName('')
    setLastName('')
    setPassword('')
    setEmail('')
    setConfirmEmail('')
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

  const checkConfirmedEmail = () => {
    if(confirmEmail.length === 0) {
      setConfirmEmailStatus('default')
    } else if(confirmEmail === email) {
      setValidComfirmEmail(true)
      setConfirmEmailStatus('valid')
    } else if (confirmEmail !== email) {
      setValidComfirmEmail(false)
      setConfirmEmailStatus('invalid')
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
        localStorage.setItem('userId', socketUserId)
        localStorage.setItem('firstName', socketFirstName)
        localStorage.setItem('lastName', socketLastName)
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
    checkConfirmedEmail()
  }, [firstName, lastName, password, email, confirmEmail])
  
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
          Enter Password
        </label>
        <input  
         type="password" 
         placeholder='Password'
         id="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
        <span className={passwordStatus}>{validPassword ? 'This is a valid Password' : 'Please enter a valid Password'}</span>
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
        <label htmlFor="confirm-email">
          <FontAwesomeIcon icon={faEnvelope} className='label-icons' />
          Confirm Email
        </label>
        <input 
         type="text" 
         placeholder='Confirm Email'
         id="confirm-email"
         value={confirmEmail}
         onChange={(e) => setConfirmEmail(e.target.value)}
        />
        <span className={confirmEmailStatus}>{validConfirmEmail ? 'This is a match' : "Please Confirm Email Address"}</span>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register