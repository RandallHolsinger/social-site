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
  
  const [showComments, setShowComments] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [liked, setLiked] = useState(false || value.liked)
  const [likeCount, setLikeCount] = useState(value.likes || 0)
  const [commentCount, setCommentCount] = useState(value.comment_count) 

  const userId = useAppSelector(state => state.user.userId)

  const likePost = async() => {
    try {
     await axios.post(`/api/post/like/${value.post_id}`)
     setLiked(true)
     setLikeCount(prevState => prevState + 1)
    } catch(err) {
      console.log(err)
    }
  }

  const unlikePost = async() => {
    try {
      await axios.delete(`/api/post/unlike/${value.post_id}`)
      setLiked(false)
      setLikeCount(prevState => prevState - 1)
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
          <div className='post-info-container'>
            <span>{likeCount}{' '} {likeCount > 1 ? 'people' : "person"} liked this post{' '}•{' '}{commentCount}{' '}Comments</span>
          </div>
          <div className="post-actions-container">
            <div className="post-like-container">
              {liked ?
               <span onClick={() => unlikePost()} className='post-like-button'>
                  <FontAwesomeIcon icon={faThumbsUp} className='post-like-icon' />{' '}Liked
                </span>
              :
                <span onClick={() => likePost()} className='post-like-button'>
                  <FontAwesomeIcon icon={faThumbsUp} className='post-like-icon' />{' '}Like
                </span>
              }
            </div>
            <div className="post-comment-container">
              <span onClick={() => setShowComments(!showComments)} className='post-comments-button'>
                <FontAwesomeIcon icon={faComment} className='post-comments-icon'/>{' '}
                Comment
              </span>
            </div>
          </div>
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