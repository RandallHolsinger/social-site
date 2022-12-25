import React, { useState } from 'react'
import './Comment.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faEllipsis} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'
import CommentDeleteButton from '../CommentDeleteButton/CommentDeleteButton'
import CommentEditButton from '../CommentEditButton/CommentEditButton'

function Comment(props) {
  
  const {value, getComments} = props

  const [showOptions, setShowOptions] = useState(false)

  const userId = useSelector(state => state.user.userId)

  return(
    <div className="Comment">
      {!value.profile_image ?
        <span className='comment-user-image-container'>
          <FontAwesomeIcon icon={faUser} className='comment-user-icon' />
        </span>
      :
         null
      }
      <article>
        <section>
          <div className='comment-container'>
            <p>
              <span className='comment-username'>
                {value.first_name}{' '}{value.last_name}
              </span>
              {value.comment}
            </p>
            <div className='comment-details'>
              <div className="comment-date-time">
                <FormatedDate date={value.date} />
                <FormatedTime time={value.date} />
              </div>
              <div className='comment-options-container'>
                {showOptions ? 
                 <div className='comment-options'>
                   <CommentEditButton comment={value} getComments={getComments}/>
                   <CommentDeleteButton comment_id={value.comment_id} getComments={getComments} />
                 </div> 
                 : 
                 null
                }
              </div>
            </div>
          </div>
        </section>
      </article>
      {value.user_id = userId ?
        <span onClick={() => setShowOptions(!showOptions)}>
          <FontAwesomeIcon icon={faEllipsis} className='comment-options-icon'/>
        </span>
      :
        null
      }
    </div>
  )
}
export default Comment