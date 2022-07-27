import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Profiles.scss'
import Search from '../Search/Search'
import Profile from '../Profile/Profile'
import Navbar from '../Navbar/Navbar'


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
      <Profile key={profile.user_id} value={profile} getProfiles={getProfiles}/>
    )
  })

  return(
    <div className="Profiles">
      <Search />
      {mappedProfiles}
      <Navbar />
    </div>
  )
}

export default Profiles