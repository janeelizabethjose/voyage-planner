import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/Login/login';
import RegistrationForm from './components/Registration/registration';
import Home from './components/Home/home';
import TripForm from './components/Trip/trip';
import TripDashboard from './components/TripDashboard/tripDashboard'
import TripDayEvent from './components/TripDayEvent/tripDayEvent'
import AlertComponent from './components/Alert/alert';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  const [title, updateTitle] = useState('Voyage Planner');
  const [errorMessage, updateErrorMessage] = useState(null);

  useEffect(() => {
    isAuthenticatedUser();
  }, []);

  const isAuthenticatedUser = () => {
    if (localStorage.getItem('userID')) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Router>
      <div className="App body">
        {/* <Header></Header> */}
        <div className="container d-flex align-items-right flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/home" render={props => isAuthenticatedUser() ? (<Home {...props} />) : ''}>
            </Route>
            <Route path="/trip">
              <TripForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/tripDashboard" render={props => isAuthenticatedUser() ? (<TripDashboard {...props} />) : ''}>
            </Route>
            <Route path="/event">
              <TripDayEvent showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;