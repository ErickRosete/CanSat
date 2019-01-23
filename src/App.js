import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import HomePage from './pages/Home/Home';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Redirect from="/" to="/home" exact />
            <Route path="/home" component={HomePage}></Route>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
