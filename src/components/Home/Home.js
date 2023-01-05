import React from 'react'
import './Home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Navbar/Navbar'
import PostAdd from '../PostAdd/PostAdd'
import Posts from '../Posts/Posts'
import PageTitle from '../PageTitle/PageTitle'

function Home() {
  
  return(
    <div className="Home">
      <Navbar />
      <PageTitle 
        icon={<FontAwesomeIcon icon={faHouseChimney} />} 
        title={'Home'}
      />
      <Posts />
    </div>
  )
}

export default Home