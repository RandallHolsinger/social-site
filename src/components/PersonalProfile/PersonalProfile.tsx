import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../../redux/reduxHooks' 
import axios from 'axios'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import UserInfo from '../UserInfo/UserInfo'
import Posts from '../Posts/Posts'
import Navbar from '../Navbar/Navbar'

export const PersonalProfile: React.FC = () => {
  
  const userId = useAppSelector(state => state.user.userId)
  
  const [user, setUser] = useState({})
  
  const getUserInfo = async(user_id: number) => {
    console.log('user id here ==>', user_id)
    if(user_id !== 0) {
      try {
        let res = await axios.get(`/api/user/${user_id}`)
        console.log(res)
        setUser(res.data[0])
      } catch(err) {
        console.log(err)
      }
    }
    console.log(user)
  }

  useEffect(() => {
    getUserInfo(userId)
  }, [userId])

  return(
    <div className="PersonalProfile">
      <Navbar />
      <ProfileHeader user={user} getUserInfo={getUserInfo}/>
      <UserInfo user={user}/>
      <Posts user_id={userId}/>
    </div>
  )
}

export default PersonalProfile