/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import User from './user.jsx';
import ApiForm from './apiForm.jsx';
import './App.css';
//import Artwork from './artworks.jsx';

class UserDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: false,
      user: [],
      artworks: [],
    };
  }

  componentDidMount() {
    fetch('/api/')
      .then((res) => res.json())
      .then((user) => {
        console.log('inside react', user);
        if (!Array.isArray(user)) user = [];
        return this.setState({
          user: user,
          fetchedData: true,
        });
      })
      .catch((err) => console.log('componentDidMount ERROR: ', err));

    fetch('/api/art')
      .then((res) => res.json())
      .then((artworks) => {
        console.log('userDisplay Fetch Request', artworks);
        if (!Array.isArray(artworks)) artworks = [];
        return this.setState({
          artworks,
        });
      })
      .catch((err) => console.log(' get fetch/api/art ERROR: ', err));
  }

  render() {
    if (this.state.fetchedData === false)
      return (
        <div className="App">
          <h1>Loading... </h1>
        </div>
      );

    const { user } = this.state;

    if (!user) return <div>Issue Loading User</div>;

    if (!user.length) return <div>No User Found</div>;

    const artArray = [];
    this.state.artworks.forEach((el, i) => {
      artArray.push(<Artwork id={i} key={i} img={el.img} />);
    });

    return (
      <div>
        <h2>user</h2>

        <div>
          <User id={1} username={user[0].username} />
        </div>
        <div>
          <ApiForm />
        </div>
        <div id="artArray">{artArray}</div>
      </div>
    );
  }
}

const Artwork = (props) => {
  const { id, img } = props;

  return (
    <div id={id}>
      <img src={img}></img>
    </div>
  );
};

export default UserDisplay;
