import React from 'react';
//import './App.css';

const ArtRender = (props) => {
  const { title, img, save } = props;
  return (
    <div className="searchCard">
      <div className="searchCardHeader">{title}</div>

      <img src={img} width={'200px'}></img>
      <br />
      <button className="save" onClick={() => save(img)}>
        save
      </button>
      <br />
    </div>
  );
};

export default ArtRender;
