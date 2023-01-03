import React, { useState } from 'react'
import './Post.scss'
import Comments from '../Comments/Comments'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEllipsis ,faComment, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'
import OptionsModal from '../OptionsModal/OptionsModal'
import PostDeleteButton from '../PostDeleteButton/PostDeleteButton'
import PostEditButton from '../PostEditButton/PostEditButton'
import OutsideClickHandler from 'react-outside-click-handler'

function Post(props) {

  const {value, getPosts} = props

  const [showComments, setShowComments] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const userId = useSelector(state => state.user.userId)

  return(
    <OutsideClickHandler onOutsideClick={() => setShowComments(false)}>
      <div className="Post">
        <header>
          <div className='post-user-container'>
              {value.profile_img ? 
                <span className='post-user-image'>
                  <img src={`/uploads/images/${props.value.profile_img}`} alt="profile" className='post-user-image'/> 
                </span>
              : 
                <span className="post-user-image-default">
                  <FontAwesomeIcon icon={faUser} className='post-user-default-icon'/> 
                </span>
              }
            <span className='post-username'>
              {value.first_name}{' '}{value.last_name}
              <div className='post-date-time'>
                <FormatedDate date={value.date} />
                <FormatedTime time={value.date} />
              </div>
            </span>
          </div>
          {value.user_id === userId ?
            <div className='post-options-container'>
              <span onClick={() => setShowOptions(!showOptions)}>
                <FontAwesomeIcon icon={faEllipsis} className='post-dropdown'/>
              </span>
              {showOptions ? 
                <OptionsModal 
                  id={value.post_id}
                  value={value} 
                  getItems={getPosts}
                  setShowOptions={setShowOptions} 
                  DeleteButton={<PostDeleteButton post_id={value.post_id} getPosts={getPosts} setShowOptions={setShowOptions}/>} 
                  EditButton={<PostEditButton post={value} getPosts={getPosts} setShowOptions={setShowOptions}/>}
                  postStyle={'post-style'}
                />
              :
                null
              }
            </div>
          :
            null
          }
        </header>
        <section className='post-content'>
          <h4>{props.value.title}</h4>
          <p>{props.value.post}</p>
          <img src={`/uploads/images/${props.value.image_file}`} alt='post' className='post-image'/>
        </section>
        <footer>
          <span className='post-like-button'>
            <FontAwesomeIcon icon={faThumbsUp} className='post-like-icon' />{' '}
            Like
          </span>
          <span className='post-dislike-button'>
            <FontAwesomeIcon icon={faThumbsDown} className='post-dislike-icon' />{' '}
            Dislike
          </span>
          <span onClick={() => setShowComments(!showComments)} className='post-comments-button'>
            <FontAwesomeIcon icon={faComment} className='post-comments-icon'/>{' '}
            Comments
          </span>
        </footer>
        {showComments ?
            <Comments post_id={props.value.post_id} />
        :
        null
        }
      </div>
    </OutsideClickHandler>
  )
}

export default Post