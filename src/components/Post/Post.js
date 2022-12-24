import React, { useState, useEffect } from 'react'
import './Post.scss'
import Comments from '../Comments/Comments'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis ,faComment, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import FormatedDate from '../FormatedDate/FormatedDate'
import PostDeleteButton from '../PostDeleteButton/PostDeleteButton'
import PostEditButton from '../PostEditButton/PostEditButton'

function Post(props) {

  const [showComments, setShowComments] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const userId = useSelector(state => state.user.userId)

  useEffect(() => {
    console.log(props.value)
  }, [])


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
              <PostEditButton post={props.value} getPosts={props.getPosts}/>
              <PostDeleteButton post_id={props.value.post_id} getPosts={props.getPosts}/>
            </div>
          :
            null
          }
        </header>
        <h5>{props.value.title}</h5>
        <img src={`/uploads/images/${props.value.image_file}`} alt='image' style={{width: '100px', height: '100px'}}/>
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