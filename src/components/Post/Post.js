import React, { useState } from 'react'
import './Post.scss'
import Comments from '../Comments/Comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { faEllipsis ,faComment, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import FormatedDate from '../FormatedDate/FormatedDate'

function Post(props) {

  const [showComments, setShowComments] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const userId = useSelector(state => state.user.userId)

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
          <FormatedDate date={props.value.date} />
          {props.value.user_id === userId ? 
            <span onClick={() => setShowOptions(!showOptions)}><FontAwesomeIcon icon={faEllipsis} /></span>
          :
            null
          }
          {showOptions ? 
            <div>
              <button>Edit</button>
              <button>delete</button>
            </div>
          :
            null
          }
        </header>
        <p>{props.value.post}</p>
        <footer>
          <span><FontAwesomeIcon icon={faThumbsUp} />{' '}Like</span>
          <span><FontAwesomeIcon icon={faThumbsDown} />{' '}Dislike</span>
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