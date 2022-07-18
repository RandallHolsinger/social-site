import React from 'react'
import './Comment.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons'

function Comment(props) {
  return(
    <div className="Comment">
      <article>
        <header>
          <span>
            {props.value.profile_img ? <img src="" alt="profile" /> : <img src={'./images/user-image-default-black.svg'} alt="profile" /> }
          </span>
          <span>
            {props.value.first_name}{' '}{props.value.last_name}
          </span>
        </header>
        <p>{props.value.comment}</p>
        <footer>
          <span><FontAwesomeIcon icon={faThumbsUp} />{' '}Like</span>
          <span><FontAwesomeIcon icon={faThumbsDown} />{' '}Dislikes</span>
        </footer>
      </article>
    </div>
  )
}
export default Comment