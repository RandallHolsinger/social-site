import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ProfileView.scss'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import UserInfo from '../UserInfo/UserInfo'
import Posts from '../Posts/Posts'

export const ProfileView: React.FC = () => {

  const [user, setUser] = useState({})
  
  let {user_id} = useParams()
  
  const getUserInfo = async(user_id?: number) => {
    try {
      let res = await axios.get(`/api/user/${user_id}`)
      setUser(res.data[0])
    } catch(err) {
      console.log(err)
    }
  }

  
  useEffect(() => {
    getUserInfo(Number(user_id))
  }, [])



  return(
    <div className="ProfileView">
      <Navbar />
      <ProfileHeader user={user} getUserInfo={getUserInfo}/>
      <UserInfo user={user}/>
      <Posts user_id={Number(user_id)}/>
    </div>
  )
}

export default ProfileView