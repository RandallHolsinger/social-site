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
      try {
        let res = await axios.get('/auth/user/current')
        dispatch(updateUser(res.data))
        if(window.location.pathname == '/'){
          navigate('/Home')
        } 
      } catch(err) {
        console.log(err)
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
