import React, { useState } from 'react'
import './Post.scss'
import Comments from '../Comments/Comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

function Post(props) {

  const [showComments, setShowComments] = useState(false)

  return(
    <div className="Post">
      <article>
        <header>
          <span>
            {props.value.profile_img ? <img src="" alt="profile" /> : <img src={'./images/user-image-default-black.svg'} alt="profile" /> }
          </span>
          <span>
            {props.value.first_name}{' '}{props.value.last_name}
          </span>
        </header>
        <p>{props.value.post}</p>
        <footer>
          <span><FontAwesomeIcon icon={faThumbsUp} />{' '}Like</span>
          <span><FontAwesomeIcon icon={faThumbsDown} />{' '}Dislikes</span>
          <span onClick={() => setShowComments(!showComments)}><FontAwesomeIcon icon={faComment} />{' '}Comments</span>
        </footer>
        {showComments ?
          <section>
            <Comments post_id={props.value.post_id} />
          </section>
        :
        null
        }
      </article>
    </div>
  )
}

export default Post