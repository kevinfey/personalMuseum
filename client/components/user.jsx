import React, { Component } from 'react';
//import './App.css';

const User = (props) => {
  const { id, username } = props;

  return <div id={id}>{username}</div>;
};

export default User;
