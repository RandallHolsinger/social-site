import React, { useState, useEffect } from 'react'
import './UserEditor.scss'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCity, faCakeCandles, faSuitcase, faSchool, faGraduationCap, faChevronRight, faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

function UserEditor(props) {

  const {setShowUserEditor} = props
  
  //Input State
  const [currentCityInput, setCurrentCityInput] = useState('')
  const [stateProvinceInput, setStateProvinceInput] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [formatedBirthday, setFormatedBirthday] = useState('')
  const [workInput, setWorkInput] = useState('')
  const [highSchoolInput, setHighSchoolInput] = useState('')
  const [collegeInput, setCollegeInput] = useState('')
  const [aboutMeInput, setAboutMeInput] = useState('')
  
  //Handle State to Toggle Menus
  const [showCurrentCity, setShowCurrentCity] = useState(false)
  const [showStateProvince, setShowStateProvince] = useState(false)
  const [showBirthday, setShowBirthday] = useState(false)
  const [showWork, setShowWork] = useState(false)
  const [showHighSchool, setShowHighSchool] = useState(false)
  const [showCollege, setShowCollege] = useState(false)
  const [showAboutMe, setShowAboutMe] = useState(false)



  const updateUserInfo = async () => {
    console.log('dob =>', formatedBirthday)
    try {
      axios.put('/api/user/update/info', {
        currentCityInput,
        stateProvinceInput,
        formatedBirthday,
        workInput,
        highSchoolInput,
        collegeInput,
        aboutMeInput
      })
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(startDate) {
      const timestamp =  startDate
      const formatedDate = timestamp.toLocaleDateString()
      setFormatedBirthday(formatedDate) 
    }
  }, [startDate])


  return (
    <div className="UserEditor">
      <header className='user-editor-header'>
        <FontAwesomeIcon icon={faPenToSquare} className='user-edit-icon' />
        <h2>Update Your Info</h2>
      </header>
      <section className='user-info-inputs-container'>
        <div className="current-city">
          <label htmlFor="current-city">
            <FontAwesomeIcon icon={faCity} className='current-city-icon'/>
            Current City
            <span onClick={() => setShowCurrentCity(!showCurrentCity)} className='user-info-dropdown-icon-container'>
              <FontAwesomeIcon icon={showCurrentCity ? faChevronDown : faChevronRight} className='user-info-dropdown-icon' />
            </span>
          </label>
          {showCurrentCity ?
            <input 
              onChange={(e) => setCurrentCityInput(e.target.value)}
                value={currentCityInput}
                id='current-city'
                name='current-city'
                type='text'
                placeholder='City'
                className=''
              />
            :
            null
          }
        </div>
        <div className="state-province">
          <label htmlFor="state-province">
            <FontAwesomeIcon icon={faCity} className='state-province-icon' />
            State / Province
            <span onClick={() => setShowStateProvince(!showStateProvince)} className='user-info-dropdown-icon-container'>
              <FontAwesomeIcon icon={showStateProvince ? faChevronDown : faChevronRight} className='user-info-dropdown-icon' />
            </span>
          </label>
          {showStateProvince ?
            <input 
              onChange={(e) => setStateProvinceInput(e.target.value)}
              value={stateProvinceInput}
              id='state-province'
              name='state-province'
              type='text'
              placeholder='State / Province'
              className=''
            />
          :
            null
          }
        </div>
        <div className="birthday">
          <label htmlFor="birthday">
            <FontAwesomeIcon icon={faCakeCandles} className='birthday-icon' />
            Birthday
            <span onClick={() => setShowBirthday(!showBirthday)} className='user-info-dropdown-icon-container'>
              <FontAwesomeIcon icon={showBirthday ? faChevronDown : faChevronRight} className='user-info-dropdown-icon' />
            </span>
          </label>
          {showBirthday ?
            <DatePicker 
              onChange={(date) => setStartDate(date)}
              selected={startDate}
              maxDate={new Date()}
              className="birthday-input"
            />
          :
            null
          }
        </div>
        <div className="work">
          <label htmlFor="work">
            <FontAwesomeIcon icon={faSuitcase} className='work-icon' />
            Work
            <span onClick={() => setShowWork(!showWork)} className='user-info-dropdown-icon-container'>
              <FontAwesomeIcon icon={showWork? faChevronDown : faChevronRight} className='user-info-dropdown-icon' />
            </span>
          </label>
          {showWork ?
            <input  
              onChange={(e) => setWorkInput(e.target.value)}
              value={workInput}
              id='work'
              name='work'
              type='text'
              placeholder='Work'
              className=''
            />
          :
            null
          }
        </div>
        <div className="high-school">
          <label htmlFor="high-school">
            <FontAwesomeIcon icon={faGraduationCap} className='high-school-icon' />
            High School
            <span onClick={() => setShowHighSchool(!showHighSchool)} className='user-info-dropdown-icon-container'>
              <FontAwesomeIcon icon={showHighSchool ? faChevronDown : faChevronRight} className='user-info-dropdown-icon' />
            </span>
          </label>
          {showHighSchool ?
            <input 
              onChange={(e) => setHighSchoolInput(e.target.value)}
              value={highSchoolInput}
              id='high-school'
              name='high-school'
              type='text'
              placeholder='High School'
            />
          :
           null
          }
        </div>
        <div className="college">
          <label htmlFor="college">
            <FontAwesomeIcon icon={faSchool} className='college-icon' />
            College
            <span onClick={() => setShowCollege(!showCollege)} className='user-info-dropdown-icon-container'>
              <FontAwesomeIcon icon={showCollege? faChevronDown : faChevronRight} className='user-info-dropdown-icon' />
            </span>
          </label>
          {showCollege ?
            <input 
              onChange={(e) => setCollegeInput(e.target.value)}
              value={collegeInput}
              id='college'
              name='college'
              type='text'
              placeholder='College'
            />
          :
            null
          }
        </div>
        <div className="about-me">
          <label htmlFor="about-me">
            <FontAwesomeIcon icon={faUser} className='about-me-icon' />
            About Me
            <span onClick={() => setShowAboutMe(!showAboutMe)} className='user-info-dropdown-icon-container'>
              <FontAwesomeIcon icon={showAboutMe? faChevronDown : faChevronRight} className='user-info-dropdown-icon' />
            </span>
          </label>
          {showAboutMe ?
            <textarea 
              onChange={(e) => setAboutMeInput(e.target.value)}
              value={aboutMeInput}
              id='about-me'
              name='about-me'
              type='text'
              placeholder='Tell people about yourself...'
              rows='10'
              autoCorrect='true'
            />
          :
            null
          }
        </div>
      </section>
      <div className="info-buttons-container">
        <button onClick={() => updateUserInfo()} className='info-submit-button'>
          Submit
        </button>
        <button onClick={() => setShowUserEditor(false)} className='info-cancel-button'>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default UserEditor