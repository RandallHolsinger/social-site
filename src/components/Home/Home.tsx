import React from 'react'
import './Home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Navbar/Navbar'
import Posts from '../Posts/Posts'
import PageTitle from '../PageTitle/PageTitle'

export const Home: React.FC = () => {
  
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