/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Components/Home';
import Game from './Components/Game';
import Login from './Containers/Login';
import Register from './Containers/Register';
import Profile from './Containers/Profile';

import Navbar from './Components/Navbar';

export default class App extends Component {
  componentWillMount() {
    const { loadUserFromToken } = this.props;
    loadUserFromToken();
  }

  render() {
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
          <Route exact path="/user/profile">
            <Profile />
          </Route>
        </Switch>
      </>
    );
  }
}
