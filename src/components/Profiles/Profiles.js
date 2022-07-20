import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Profiles.scss'
import Profile from '../Profile/Profile'

function Profiles() {
  
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
      <Profile key={profile.user_id} value={profile} />
    )
  })

  return(
    <div className="Profiles">
      {mappedProfiles}
    </div>
  )
}

export default Profiles