import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';

function App() {
  
  const [user, setUser] = useState(userService.getUser())
  

  function handleLogout(){
    userService.logout();
    setUser({ user: null });
  }

  function handleSignupOrLogin(){
    setUser({user: userService.getUser()});
  }

  return (
    <div className="App">
      <Switch>
          <Route exact path="/">
              <h1>Home Page</h1>
          </Route>
          <Route exact path="/login">
             <LoginPage 
              handleSignupOrLogin={handleSignupOrLogin}
             />
          </Route>
          <Route exact path="/signup">
             <SignupPage
              handleSignupOrLogin={handleSignupOrLogin}
             />
          </Route>
      </Switch>
    </div>
  );
}

export default App;