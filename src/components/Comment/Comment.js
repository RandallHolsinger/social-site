import React from 'react'
import './Comment.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'

function Comment(props) {
  return(
    <div className="Comment">
      <article>
        <header>
          <span>
            {props.value.profile_img ? <img src="" alt="profile" /> : <img src={'./images/user-image-default-black.svg'} alt="profile" /> }
          </span>
          <div>
            <span>
              {props.value.first_name}{' '}{props.value.last_name}
            </span>
            <FormatedDate date={props.value.date} />
          </div>
          <FormatedTime date={props.value.date} />
        </header>
        <p>{props.value.comment}</p>
        <footer>
          <span><FontAwesomeIcon icon={faThumbsUp} />{' '}Like</span>
          <span><FontAwesomeIcon icon={faThumbsDown} />{' '}Dislike</span>
        </footer>
      </article>
    </div>
  )
}
export default Comment