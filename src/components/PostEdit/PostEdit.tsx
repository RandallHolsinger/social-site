import React, { useState } from 'react'
import './PostEdit.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import PostEditor from '../PostEditor/PostEditor'
import { IPost as IProps } from '../Posts/Posts'

interface PostEditProps {
  post: IProps,
  getPosts: () => Promise<void>
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
}

const PostEdit: React.FC<PostEditProps> = (props) => {
 
  const [showEditPost, setShowEditPost] = useState(false)

  const {post, getPosts, setShowOptions} = props
  

  return (
    <div className="PostEdit">
      <button onClick={() => setShowEditPost(true)} className='post-edit-button'>
        <FontAwesomeIcon icon={faPenSquare} className='post-edit-icon' />
        Edit
      </button>
      {showEditPost ?
        <PostEditor 
          post={post}
          getPosts={getPosts}
          setShowEditPost={setShowEditPost}
          setShowOptions={setShowOptions}
        />
      :
        null
      }
    </div>
  )
}

export default PostEdit