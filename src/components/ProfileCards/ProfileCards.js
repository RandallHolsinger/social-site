import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ProfileCards.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Navbar/Navbar'
import ProfileCard from '../ProfileCard/ProfileCard'
import PageTitle from '../PageTitle/PageTitle'
import Search from '../Search/Search'
import { useSelector } from 'react-redux'


function ProfileCards() {
  
  const [profiles, setProfiles] = useState([])
  const [filteredProfiles, setFilteredProfiles] = useState([])

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

    let mappedFilteredProfiles = filteredProfiles.map(profile => {
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
      <PageTitle icon={<FontAwesomeIcon icon={faPeopleGroup} />} title={'People'} />
      <Search items={profiles} setItems={setFilteredProfiles}/>
      <div className="profile-cards-container">
        {filteredProfiles[0] ?
          mappedFilteredProfiles
        :
          mappedProfiles
        }
      </div>
    </div>
  )
}

export default ProfileCards