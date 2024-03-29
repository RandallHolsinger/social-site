import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../../redux/reduxHooks' 
import axios from 'axios'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import UserInfo from '../UserInfo/UserInfo'
import Posts from '../Posts/Posts'
import Navbar from '../Navbar/Navbar'

export interface IUser {
  user_id?: number,
  first_name?: string,
  last_name?: string,
  profile_img?: string, 
  dob?: string,
  city?: string,
  state_province?: string,
  occupation?: string,
  high_school?: string,
  college?: string,
  about_me?: string
}

export const PersonalProfile: React.FC = () => {
  
  const userId = useAppSelector(state => state.user.userId)
  
  const [user, setUser] = useState({})
  
  const getUserInfo = async () => {
    try {
      let res = await axios.get(`/api/user/${userId}`)
      setUser(res.data[0])
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(userId != 0) {
      getUserInfo()
    }
  }, [userId])

  return(
    <div className="PersonalProfile">
      <Navbar />
      <ProfileHeader user={user} getUserInfo={getUserInfo}/>
      <UserInfo user={user}/>
      <Posts user_id={userId} pagePosition={'profile-position'} />
    </div>
  )
}

export default PersonalProfile