import React from 'react'
import { useSelector } from 'react-redux'
import Logout from '../Logout/Logout'

function Home() {
  
  const username = useSelector(state => state.user.username)
  const userId = useSelector(state => state.user.userId)
  console.log('username and id ==> ', username, userId)
  return(
    <div className="Home">
      <span>Welcome, {username} with ID: {userId}</span>  
      <Logout />
    </div>
  )
}

export default Home