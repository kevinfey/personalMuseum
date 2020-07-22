import React from 'react';
//import './App.css';

const ArtRender = (props) => {
  const { value } = props;
  return <div className="App">{value.title} </div>;
};

export default ArtRender;
