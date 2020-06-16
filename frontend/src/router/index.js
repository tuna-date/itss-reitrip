import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Profile from 'pages/Profile';
import About from 'pages/About'
import Place from 'pages/Place';

export default function index() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/myprofile' component={Profile} />
      <Route exact path='/about' component={About} />
      <Route exact path='/place/:id' component={Place} />
    </Switch>
  )
}
