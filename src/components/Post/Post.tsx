import React, { useState } from 'react'
import './Post.scss'
import { useAppSelector } from '../../redux/reduxHooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEllipsis ,faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Comments from '../Comments/Comments'
import FormatedDate from '../FormatedDate/FormatedDate'
import FormatedTime from '../FormatedTime/FormatedTime'
import OptionsModal from '../OptionsModal/OptionsModal'
import PostDelete from '../PostDelete/PostDelete'
import PostEdit from '../PostEdit/PostEdit'
import OutsideClickHandler from 'react-outside-click-handler'
import { IPost as IProps } from '../Posts/Posts'

interface PostProps {
  value: IProps,
  getPosts: () => Promise<void>
}

export const Post: React.FC<PostProps> = (props) => {

  const { value, getPosts } = props

  const [showComments, setShowComments] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [liked, setLiked] = useState(false)

  const userId = useAppSelector(state => state.user.userId)
  
  const updateLikedPost = () => {
    if(liked) {
      axios.put(`/api/post/like/${value.post_id}`)

    } else if (!liked) {
      axios.put(`/api/post/like/${value.post_id}`)
    }
  }
  
  const toggleLiked = () => {
    setLiked(!liked)
    updateLikedPost()
  }

  const renderLike = () => {
    if (liked) {
      return <>Liked {value.likes + 1}</>;
    } else {
      return <>Like {value.likes}</>;
    }
  }

  return(
    <OutsideClickHandler onOutsideClick={() => setShowComments(false)}>
      <div className="Post">
        <header>
          <div className='post-user-container'>
              {value.profile_img ? 
                <span className='post-user-image'>
                  <img src={`/uploads/images/${value.profile_img}`} alt="profile" className='post-user-image'/> 
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
                  setShowOptions={setShowOptions} 
                  DeleteButton={<PostDelete post_id={value.post_id} getPosts={getPosts} setShowOptions={setShowOptions}/>} 
                  EditButton={<PostEdit post={value} getPosts={getPosts} setShowOptions={setShowOptions}/>}
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
          <h4>{value.title}</h4>
          <p>{value.post}</p>
          <img src={`/uploads/images/${value.image_file}`} alt='post' className='post-image'/>
        </section>
        <footer>
          <span onClick={toggleLiked} className='post-like-button'>
            <FontAwesomeIcon icon={faThumbsUp} className='post-like-icon' />{' '}
            {renderLike()}
          </span>
          <span onClick={() => setShowComments(!showComments)} className='post-comments-button'>
            <FontAwesomeIcon icon={faComment} className='post-comments-icon'/>{' '}
            Comments
          </span>
        </footer>
        {showComments ?
            <Comments post_id={value.post_id} />
        :
        null
        }
      </div>
    </OutsideClickHandler>
  )
}

export default Post