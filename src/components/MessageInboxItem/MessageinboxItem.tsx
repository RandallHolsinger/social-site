import React from 'react'
import './MessageInboxItem.scss'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { IMessageInbox as IProps } from '../MessageInbox/MessageInbox'

interface MessageInboxItemProps {
  value: IProps,
}

export const MessageInboxItem: React.FC<MessageInboxItemProps> = (props) => {

  const { value } = props
  
  const deleteInboxitem = async (inbox_id: number) => {
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
          {value.profile_img ? 
            <img src={require(`../../../server/uploads/images/${value.profile_img}`)} alt='profile'/>
          :
            <FontAwesomeIcon icon={faUser} className='inbox-default-user-img'/>
          }
        </div>
        <Link to={`/Messages/${value.conversation_id}`}  className='messages-link'>
        <div className="inbox-content">
          <h3 className='inbox-friend-name'>{value.first_name}{' '}{value.last_name}</h3>
          <h4 className='inbox-last-subject'>Subject: {value.last_subject}</h4>
          <h4 className='inbox-last-message'>{value.last_message.slice(0, 20) + '...'}</h4>
          <div className="inbox-datetime">
            <span className="inbox-date">
              <FormatedDate date={value.date} />
            </span>
            <span className='inbox-time'>
              <FormatedTime time={value.date} />
            </span>
          </div>
        </div>
        </Link>
        <button onClick={() => deleteInboxitem(value.inbox_id)} className='message-delete-button'>Delete</button>
      </article>
    </div>
  )
}

export default MessageInboxItem