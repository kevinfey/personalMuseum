import React, { useState } from 'react';
import './App.css';

function Register(props) {
  const [state, setState] = useState({
    username: '',
    password: '',
    confirmPassword: '',
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
    if (state.password === state.confirmPassword) {
      sendToServer();
    } else {
      return 'Passwords Do Not Match';
    }
    setState(() => ({
      username: '',
      password: '',
      confirmPassword: '',
    }));
  };

  const sendToServer = () => {
    const payload = {
      username: state.username,
      password: state.password,
    };
    fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={state.confirmPassword}
              onChange={update}
            />
          </div>
          <button type="submit" className="btn-primary" onClick={sumbitClick}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
