import React, { Component } from 'react';
//import './App.css';

const Artworks = (props) => {
  const { id, img } = props;

  return (
    <div id={id}>
      <img src={img}></img>
    </div>
  );
};

export default Artworks;
