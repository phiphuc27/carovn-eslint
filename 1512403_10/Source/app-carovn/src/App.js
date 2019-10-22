import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Components/Home';
import Game from './Components/Game';
import Login from './Containers/Login';
import Register from './Containers/Register';

import Navbar from './Components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/game">
          <Game />
        </Route>
        <Route exact path="/user/register">
          <Register />
        </Route>
        <Route exact path="/user/login">
          <Login />
        </Route>
      </Switch>
    </>
  );
}
