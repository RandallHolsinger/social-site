import React from 'react'
import './MessageInboxItem.scss'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'

function MessageInboxItem(props) {

  const {value} = props

  return(
    <div className="MessageInboxItem">
      <article>
        <div className="inbox-profile-img">
          <img src={`/uploads/images/${value.profile_img}`} alt='profile'/>
        </div>
        <div className="inbox-content">
          <h3 className='inbox-friend-name'>{value.first_name}{' '}{value.last_name}</h3>
          <h4 className='inbox-last-subject'>Subject: {value.last_subject}</h4>
          <h4 className='inbox-last-message'>{value.last_message.slice(0, 20) + '...'}</h4>
        </div>
        <div className="inbox-datetime">
          <span className="inbox-date">
            <FormatedDate date={value.date} />
          </span>
          <span className='inbox-time'>
            <FormatedTime time={value.date} />
          </span>
        </div>
      </article>
    </div>
  )
}

export default MessageInboxItem