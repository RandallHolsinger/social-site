import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ProfileView.scss'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import UserInfo from '../UserInfo/UserInfo'
import Posts from '../Posts/Posts'

function ProfileView() {

  const [user, setUser] = useState({})
  
  let {user_id} = useParams()
  
  const getUserInfo = async(user_id) => {
    try {
      let res = await axios.get(`/api/user/${user_id}`)
      console.log(res.data)
      setUser(res.data[0])
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserInfo(user_id)
  }, [])



  return(
    <div className="ProfileView">
      <Navbar />
      <ProfileHeader user={user} getUserInfo={getUserInfo}/>
      <UserInfo user={user}/>
      <Posts user_id={user_id}/>
    </div>
  )
}

export default ProfileView