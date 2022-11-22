import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from './redux/slices/userSlice';
import './App.scss';
import routes from './routes';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3000/', {autoConnect: false});

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const socketUserId = useSelector(state => state.user.userId)
  const socketFirstName = useSelector(state => state.user.firstName)
  const socketLastName = useSelector(state => state.user.lastName)

  const [reduxStateLoaded, setReduxStateLoaded] = useState(false)

  const setLocalStorageForSocket = () => {
    localStorage.setItem('userId', socketUserId)
    localStorage.setItem('firstName', socketFirstName)
    localStorage.setItem('lastName', socketLastName)
    socket.emit('login', {socketUserId, socketFirstName, socketLastName, socketID: socket.id})
  }
  
  
  const getUser = async () => {
    let userId = socketUserId
    if(userId === 0) {
      try {
        let res = await axios.get('/auth/user/current')
        dispatch(updateUser(res.data))
        setReduxStateLoaded(true)
        if(reduxStateLoaded) {
        setLocalStorageForSocket()
        }
        if(window.location.pathname === '/'){
          navigate('/Home')
        } 
      } catch(err) {
        console.log(err)
        navigate('/')
      }
    } 
  }
  
  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
