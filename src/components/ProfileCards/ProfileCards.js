import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ProfileCards.scss'
import Navbar from '../Navbar/Navbar'
import ProfileCard from '../ProfileCard/ProfileCard'


function ProfileCards() {
  
  const [profiles, setProfiles] = useState([])

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
    return(
      <ProfileCard key={profile.user_id} value={profile} />
    )
  })

  return(
    <div className="Profiles">
      <Navbar />
      {mappedProfiles}
    </div>
  )
}

export default ProfileCards