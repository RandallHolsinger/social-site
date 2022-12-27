import React, { useState } from 'react'
import './Comment.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faEllipsis} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'
import CommentDeleteButton from '../CommentDeleteButton/CommentDeleteButton'
import CommentEditButton from '../CommentEditButton/CommentEditButton'
import OptionsModal from '../OptionsModal/OptionsModal'

function Comment(props) {
  
  const {value, getComments} = props

  const [showOptions, setShowOptions] = useState(false)

  const userId = useSelector(state => state.user.userId)

  return(
    <div className="Comment">
      <article>
      <div className='comment-user-image-container'>
        {value.profile_img ?
          <img src={`/uploads/images/${value.profile_img}`} alt='profile' className='comment-user-image'/>
        :
            <FontAwesomeIcon icon={faUser} className='comment-user-icon' />
        }
      </div>
        <div className='comment-container'>
        <p>
          <span className='comment-username'>
            {value.first_name}{' '}{value.last_name}
          </span>
          {value.comment}
        </p>
        <div className="comment-details">
          <span className='comment-date'>
            <FormatedDate date={value.date} />
          </span>
          <span className="comment-time">
            <FormatedTime time={value.date} />
          </span>
          <span className='comment-edit-tag'>
            {value.edited ? '- Edited' : null}
          </span>
        </div>
      </div>
      </article>
      {value.user_id = userId ?
        <div className="comment-options-container">
          <span onClick={() => setShowOptions(!showOptions)} className='comment-options-icon'>
            <FontAwesomeIcon icon={faEllipsis} />
          </span>
          {showOptions ? 
            <OptionsModal 
              id={value.comment_id}
              value={value} 
              getItems={getComments}
              setShowOptions={setShowOptions} 
              DeleteButton={<CommentDeleteButton comment_id={value.comment_id} getComments={getComments} setShowOptions={setShowOptions}/>} 
              EditButton={<CommentEditButton comment={value} getComments={getComments} setShowOptions={setShowOptions}/>}
              commentStyle={'comment-style'}
            />
          : 
            null
          }
        </div>
      :
        null
      }
    </div>
  )
}
export default Comment