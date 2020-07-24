import React, { useState } from 'react';

import './App.css';

function Login(props) {
  const [state, setState] = useState({
    username: '',
    password: '',
    loggedIn: false,
    userId: '',
  });

  const update = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const sumbitClick = (e) => {
    e.preventDefault();
    sendToServer();
    setState(() => ({
      username: '',
      password: '',
    }));
  };

  const sendToServer = () => {
    const payload = {
      username: state.username,
      password: state.password,
    };
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setState(() => ({
          loggedIn: data.match,
          userId: data.id,
        }));
        //use callback function to update global state
        console.log('props update?', props.update);
        // reset state
        props.update({
          loggedIn: data.match,
          userId: data.id,
          username: state.username,
        });
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (state.loggedIn) {
    return <div>LOGGED IN : {state.userId}</div>;
  }

  return (
    <div className="App">
      <div>
        <h1>Login</h1>

        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Select Username"
              value={state.username}
              onChange={update}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={state.password}
              onChange={update}
            />
          </div>

          <button type="submit" className="btn-primary" onClick={sumbitClick}>
            Login
          </button>

          <div></div>
        </form>
      </div>
    </div>
  );
}

export default Login;
