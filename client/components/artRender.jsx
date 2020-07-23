import React from 'react';
//import './App.css';

const ArtRender = (props) => {
  const { title, img, save } = props;
  return (
    <div>
      <br />
      {title}
      <br />
      <img src={img}></img>
      <br />
      <button onClick={() => save(img)}>Save</button>
      <br />
    </div>
  );
};

export default ArtRender;
