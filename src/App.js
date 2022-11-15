import React, {useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from './redux/slices/userSlice';
import './App.scss';
import routes from './routes';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3000/');

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector(state => state.user.userId)

  const getUser = async () => {
    if(userId === 0) {
      try {
        let res = await axios.get('/auth/user/current')
        dispatch(updateUser(res.data))
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
