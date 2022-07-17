import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CreatePost(props) {
  
  const [postInput, setPostInput] = useState('')

  const addPost = async () => {
    try {
      let data = postInput
      console.log('here is post data ==>', data)
      await axios.post('/api/post/add', {data})
      await props.getUserPosts()
      console.log('add post function end')
    } catch(err) {
      console.log(err)
    }
    setPostInput('')
  }
  return(
    <div className="CreatePost">
      <header>
        <h4>Create a Post</h4>
      </header>
      <input 
        type="text" 
        placeholder="What's on your mind?"
        onChange={(e) => setPostInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? addPost() : null}
      />
      <button onClick={() => addPost()}>Add Post</button>
    </div>
  )
}

export default CreatePost