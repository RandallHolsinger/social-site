import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import PersonalProfile from './components/PersonalProfile/PersonalProfile'
import ProfileCards from './components/ProfileCards/ProfileCards'
import Friends from './components/Friends/Friends'
import MessageInbox from './components/MessageInbox/MessageInbox'
import socket from './socketIO/socket'

export default (
  <Routes>
    <Route path="/" element={<Login socket={socket}/>} />
    <Route path="/Register" element={<Register socket={socket}/>} />
    <Route path="/Home" element={<Home />} />
    <Route path="/PersonalProfile" element={<PersonalProfile />} />
    <Route path="/Profiles" element={<ProfileCards />} />
    <Route path="/Friends" element={<Friends />} />
    <Route path="/MessageInbox" element={<MessageInbox />} />
  </Routes>
)