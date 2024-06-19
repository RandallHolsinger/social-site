import React, { useEffect } from 'react'
import axios from 'axios'
import { useAppSelector, useAppDispatch } from './redux/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { updateUser } from './redux/slices/userSlice';
import './App.scss';
import routes from './routes';
import ParticlesBackground from './components/Particles/ParticlesBackground';

export const App: React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userId = useAppSelector(state => state.user.userId)
  
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

  useEffect(() => {
  
  })

  return (
    <div className="App">
      <ParticlesBackground />
      {routes}
    </div>
  );
}

export default App;
