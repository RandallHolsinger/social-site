import React from 'react'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import Posts from '../Posts/Posts'

function Home() {
  
  return(
    <div className="Home">
      <Search />
      <Posts />
      <Navbar />
    </div>
  )
}

export default Home