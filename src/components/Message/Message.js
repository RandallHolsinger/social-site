import React, { useEffect } from 'react'
import './Message.scss'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'

function Message(props) {

  const {value} = props
   
  useEffect(() => {
    console.log('value', value) 
  }, [])

  return(
    <div className="Message">
      <article>
        <header className='message-header'>
          <div className="message-profile-img-container">
            <img src={`/uploads/images/${value.profile_img}`} alt='profile' />
          </div>
          <div className="message-details">
            <h3 className='message-sender-name'>{value.first_name}{' '}{value.last_name}</h3>
            <h4><FormatedDate date={value.date}/></h4>
            <h4><FormatedTime time={value.date}/></h4>
          </div>
        </header>
        <div className="message-content">
          <h3>{value.subject}</h3>
          <p>{value.message}</p>
        </div>
      </article>
    </div>
  )
}

export default Message