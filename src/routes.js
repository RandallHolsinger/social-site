import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import PersonalProfile from './components/PersonalProfile/PersonalProfile'
import Profiles from './components/Profiles/Profiles'
import Friends from './components/Friends/Friends'
import Messages from './components/Messages/Messages'

export default (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/PersonalProfile" element={<PersonalProfile />} />
    <Route path="/Profiles" element={<Profiles />} />
    <Route path="/Friends" element={<Friends />} />
    <Route path="/Messages" element={<Messages />} />
  </Routes>
)