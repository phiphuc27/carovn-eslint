import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Pages/Home';
import Game from './Pages/Game';
import Login from './Pages/Login';
import Register from './Pages/Register';

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
