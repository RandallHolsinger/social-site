import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ProfileCards.scss'
import Navbar from '../Navbar/Navbar'
import ProfileCard from '../ProfileCard/ProfileCard'
import { useSelector } from 'react-redux'


function ProfileCards() {
  
  const [profiles, setProfiles] = useState([])

  const userId = useSelector(state => state.user.userId)

  const getProfiles = async () => {
    try {
      let res = await axios.get('/api/users')
      setProfiles(res.data)
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProfiles()
  }, [])

  let mappedProfiles = profiles.map(profile => {
    return (
      profile.user_id !== userId ?
        <ProfileCard key={profile.user_id} value={profile} />
      :
        null
    )
   })

  return(
    <div className="ProfileCards">
      <Navbar />
      <div className="profile-cards-container">
        {mappedProfiles}
      </div>
    </div>
  )
}

export default ProfileCards