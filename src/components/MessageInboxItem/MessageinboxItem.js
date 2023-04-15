import React from 'react'
import './MessageInboxItem.scss'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'
import axios from 'axios'

function MessageInboxItem(props) {

  const {value} = props
  
  // delete inbox item 
  const deleteInboxitem = async (inbox_id) => {
    try {
      axios.delete(`/api/inbox/delete/${inbox_id}`)
    } catch(err) {
      console.log(err)
    }
  }

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
          <button onClick={() => deleteInboxitem(value.inbox_id)}>Delete</button>
        </div>
      </article>
    </div>
  )
}

export default MessageInboxItem