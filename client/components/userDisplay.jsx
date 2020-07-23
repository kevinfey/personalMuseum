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
    // fetch('/api/')
    //   .then((res) => res.json())
    //   .then((user) => {
    //     if (!Array.isArray(user)) user = [];
    //     return this.setState({
    //       user: user,
    //       fetchedData: true,
    //     });
    //   })
    //   .catch((err) => console.log('componentDidMount ERROR: ', err));

    //TODO
    //SEND in USERID
    const payload = {
      id: this.props.id,
    };
    fetch(`/api/artwork/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((artworks) => {
        console.log('userDisplay Fetch Request', artworks);
        if (!Array.isArray(artworks)) artworks = [];
        return this.setState({
          fetchedData: true,
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

    // const { user } = this.state;

    // if (!user) return <div>Issue Loading User</div>;

    // if (!user.length) return <div>No User Found</div>;

    const artArray = [];
    this.state.artworks.forEach((el, i) => {
      artArray.push(<Artwork id={i} key={i} img={el.img} />);
    });
    console.log('artworks state check', this.state.artworks);

    return (
      <div>
        <h3>
          Hello {this.props.username}
          {/* <User id={1} username={user[0].username} /> */}
        </h3>
        <div>
          <ApiForm id={this.props.id} />
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
