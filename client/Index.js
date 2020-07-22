import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UserDisplay from './components/userDisplay';
import Register from './components/register';
import Header from './components/header';
import Login from './components/login';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/main" component={UserDisplay} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Register} />
          </Switch>
        </Router>
      </div>
      // <div id="app">
      //   <Header />
      //   <Login />
      //   <Register />
      //   <h1>User Display</h1>

      //   <h2>Art will go Here</h2>
      //   <UserDisplay />
      // </div>
    );
  }
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
