import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import PersonalProfile from './Components/PersonalProfile/PersonalProfile';
import Home from './Components/Home/Home';
import Profiles from './Components/Profiles/Profiles';
import ProfileView from './Components/ProfileView/ProfileView';
import Messages from './Components/Messages/Messages';
import Message from './Components/Message/Message';

export default (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register}/>
      <Route path='/profile/view/:user_id'  component={ProfileView}/>
      <Route path='/home' component={Home}/>
      <Route path='/profiles' component={Profiles}/>
      <Route path='/user/profile' component={PersonalProfile}/>
      <Route path='/user/messages' component={Messages}/>
      <Route path='/user/message/:friend_id' component={Message}/>
    </Switch>
)