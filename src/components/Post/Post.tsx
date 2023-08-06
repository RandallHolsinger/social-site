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
import Image from '../Image/Image'
import OutsideClickHandler from 'react-outside-click-handler'
import { IPost as IProps } from '../Posts/Posts'

interface PostProps {
  value: IProps,
  getPosts: () => Promise<void>
}

export const Post: React.FC<PostProps> = (props) => {

  const { value, getPosts } = props
  
  console.log('value here ==>', value)

  const [showComments, setShowComments] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [liked, setLiked] = useState(false || value.liked)
  const [likeCount, setLikeCount] = useState(value.likes)
  const [commentCount, setCommentCount] = useState(value.comment_count) 

  const userId = useAppSelector(state => state.user.userId)

  const likePost = async() => {
    try {
     await axios.post(`/api/post/like/${value.post_id}`)
     setLiked(true)
     setLikeCount(value.likes + 1)
    } catch(err) {
      console.log(err)
    }
  }

  const unlikePost = async() => {
    try {
      await axios.delete(`/api/post/unlike/${value.post_id}`)
      setLiked(false)
      setLikeCount(value.likes - 1)
    } catch(err) {
      console.log(err)
    }
  }
  
  return(
    <OutsideClickHandler onOutsideClick={() => setShowComments(false)}>
      <div className="Post">
        <header>
          <div className='post-user-container'>
              {value.profile_img ? 
                <Image image={value.profile_img} style={'post-user-image'} />
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
          {value.image_file ? 
            <Image image={value.image_file} style={'post-image'} />
          :
            null
          }
        </section>
        <footer>
          {liked ?
           <span onClick={() => unlikePost()} className='post-like-button'>
              {likeCount}{' '}
              <FontAwesomeIcon icon={faThumbsUp} className='post-like-icon' />{' '}liked
            </span>
          :
            <span onClick={() => likePost()} className='post-like-button'>
              {value.likes} {' '}
              <FontAwesomeIcon icon={faThumbsUp} className='post-like-icon' />{' '}Like
            </span>
          }
          <span onClick={() => setShowComments(!showComments)} className='post-comments-button'>
            <span className='comment-count'>{commentCount}</span>
            <FontAwesomeIcon icon={faComment} className='post-comments-icon'/>{' '}
            Comments
          </span>
        </footer>
        {showComments ?
            <Comments post_id={value.post_id} setCommentCount={setCommentCount}/>
        :
        null
        }
      </div>
    </OutsideClickHandler>
  )
}

export default Post