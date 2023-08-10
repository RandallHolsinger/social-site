import React, {useEffect} from 'react'
import './MessageInboxItem.scss'
import axios from 'axios'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'
import Image from '../Image/Image'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
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

  useEffect(() => {
    console.log('value of inbox item props ==>', value)
  }, [])

  return(
    <div className="MessageInboxItem">
      <article>
        <div className="inbox-profile-img">
          {value.profile_img ?
            <Image image={value.profile_img} style={'inbox-user-image'} /> 
          :
            <FontAwesomeIcon icon={faUser} className='inbox-default-user-img'/>
          }
        </div>
        <Link to={`/Messages/${value.conversation_id}/${value.friend_uid}`}  className='messages-link'>
        <div className="inbox-content">
          <h3 className='inbox-friend-name'>{value.first_name}{' '}{value.last_name}</h3>
          <h4 className='inbox-last-subject'>{value.last_subject}</h4>
          <p className='inbox-last-message'>{value.last_message.slice(0, 20) + '...'}</p>
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
        <div className='inbox-options-container'>
          {!value.seen && value.last_sent_id !== value.owner_id ?
            <div className="new-message-container">
              <span className='new-message-bubble'></span>
              <span className='new-message-tag'>New Message</span>
            </div>
          :
            null
          }
          <button onClick={() => deleteInboxitem(value.inbox_id)} className='message-delete-button'>Delete</button>
        </div>
      </article>
    </div>
  )
}

export default MessageInboxItem