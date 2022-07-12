import React, {useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from './redux/slices/userSlice';
import './App.scss';
import routes from './routes';

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector(state => state.user.userId)

  const getUser = async () => {
    if(!userId) {
      console.log('getting the user')
      try {
        let res = await axios.get('/auth/user/current')
        dispatch(updateUser(res.data))
        if(window.location.pathname == '/'){
          navigate('/Home')
        } 
        console.log('here is the user on session ==>', res)
      } catch(err) {
        console.log(err)
      }
    } 
  }

  useEffect(() => {
    getUser()
    console.log('location ==>', window.location)
  }, [])

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
