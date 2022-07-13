import { Routes, Route } from "react-router-dom"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"
import PersonalProfile from "./components/PersonalProfile/PersonalProfile"
import Friends from "./components/Friends/Friends"

export default (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/PersonalProfile" element={<PersonalProfile />} />
    <Route path="/Friends" element={<Friends />} />
  </Routes>
)