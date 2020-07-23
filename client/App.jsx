import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserDisplay from './components/userDisplay';
import Register from './components/register';
import Header from './components/header';
import Login from './components/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userId: '',
      username: '',
    };

    this.updateGlobal = this.updateGlobal.bind(this);
  }

  updateGlobal(obj) {
    this.setState(() => ({
      loggedIn: obj.loggedIn,
      userId: obj.userId,
      username: obj.username,
    }));
  }

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route
              exact
              path="/main"
              render={() => (
                <UserDisplay
                  loggedIn={this.state.loggedIn}
                  id={this.state.userId}
                  username={this.state.username}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={() => <Login update={this.updateGlobal} />}
            />
            <Route
              exact
              path="/"
              render={() => <Register update={this.updateGlobal} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
