import React from 'react'
import './Home.scss'
import Navbar from '../Navbar/Navbar'
import Posts from '../Posts/Posts'

function Home() {
  
  return(
    <div className="Home">
      <Navbar />
      <Posts />
    </div>
  )
}

export default Home