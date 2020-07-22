import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
    );
  }
}

export default App;
