import React, { useState } from 'react'
import './Comment.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faEllipsis} from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '../../redux/reduxHooks'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'
import CommentDelete from '../CommentDelete/CommentDelete'
import CommentEdit from '../CommentEdit/CommentEdit'
import OptionsModal from '../OptionsModal/OptionsModal'
import { IComment as IProps} from '../Comments/Comments'

export interface commentProps {
  value: IProps
  getComments: () => Promise<void>
}

export const Comment: React.FC<commentProps> = (props) => {
  
  const { value, getComments } = props
  
  const [showOptions, setShowOptions] = useState(false)

  const userId = useAppSelector(state => state.user.userId)

  return(
    <div className="Comment">
      <article>
        {value.profile_img ?
          <div className='comment-user-image-container'>
            <img src={`/uploads/images/${value.profile_img}`} alt='profile' className='comment-user-image'/>
          </div>
        :
          <div className="comment-user-image-default-container">
            <FontAwesomeIcon icon={faUser} className='comment-user-icon' />
          </div>
        }
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
      {value.user_id === userId ?
        <div className="comment-options-container">
          <span onClick={() => setShowOptions(!showOptions)} className='comment-options-icon'>
            <FontAwesomeIcon icon={faEllipsis} />
          </span>
          {showOptions ? 
            <OptionsModal 
              setShowOptions={setShowOptions} 
              DeleteButton={<CommentDelete comment_id={value.comment_id} getComments={getComments} setShowOptions={setShowOptions}/>} 
              EditButton={<CommentEdit comment={value} getComments={getComments} setShowOptions={setShowOptions}/>}
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