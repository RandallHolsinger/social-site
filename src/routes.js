import { Routes, Route } from 'react-router-dom'
import socket from './socketIO/socket'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import PersonalProfile from './components/PersonalProfile/PersonalProfile'
import ProfileView from './components/ProfileView/ProfileView'
import ProfileCards from './components/ProfileCards/ProfileCards'
import Friends from './components/Friends/Friends'
import MessageInbox from './components/MessageInbox/MessageInbox'
import Messages from './components/Messages/Messages'

export default (
  <Routes>
    <Route path="/" element={<Login socket={socket}/>} />
    <Route path="/Register" element={<Register socket={socket}/>} />
    <Route path="/Home" element={<Home />} />
    <Route path="/PersonalProfile" element={<PersonalProfile />} />
    <Route path="/Profiles" element={<ProfileCards />} />
    <Route path='/Profile/View/:user_id' element={<ProfileView />} />
    <Route path="/Friends" element={<Friends />} />
    <Route path="/MessageInbox" element={<MessageInbox />} />
    <Route path="/Messages/:conversation_id" element={<Messages />} />
  </Routes>
)