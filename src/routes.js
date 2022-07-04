import { Routes, Route } from "react-router-dom"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"

export default (
  <Routes>
    <Route path="/" element={<Login />}/>
    <Route path="/Register" element={<Register />}/>
  </Routes>
)