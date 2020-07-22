import React from 'react';
//import './App.css';

const ArtRender = (props) => {
  const { value } = props;
  return (
    <div>
      {value.title}
      <br />
      {value.medium}
      <br />
      {value.dimensions}
    </div>
  );
};

export default ArtRender;
