import { Routes, Route } from "react-router-dom"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"

export default (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/Home" element={<Home />} />
  </Routes>
)