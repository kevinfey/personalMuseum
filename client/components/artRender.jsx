import React from 'react';
//import './App.css';

const ArtRender = (props) => {
  const { value, img, save } = props;
  return (
    <div>
      {value.title}
      <br />
      {value.medium}
      <br />
      {value.dimensions}
      <br />
      <img src={img}></img>
      <br />
      <button onClick={() => save()}>Save</button>
    </div>
  );
};

export default ArtRender;
