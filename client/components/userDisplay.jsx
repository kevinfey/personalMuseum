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
    this.del = this.del.bind(this);
    this.refresh = this.refresh.bind(this);
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

  del(imgId) {
    fetch(`/api/art/${imgId}`, {
      method: 'DELETE',
    }).catch((err) => console.log(' delete ERROR: ', err));
  }

  refresh() {
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
      artArray.push(
        <Artwork id={el.art_id} key={i} img={el.img} del={this.del} />
      );
    });
    console.log('artworks state check', this.state.artworks);

    return (
      <div className="App">
        <div>
          <h3>
            Welcome {this.props.username}
            {/* <User id={1} username={user[0].username} /> */}
          </h3>
          <div>
            <ApiForm id={this.props.id} refresh={this.refresh} />
          </div>
          <br></br>
          <br></br>
          <div className="artCardContainer">{artArray}</div>
        </div>
      </div>
    );
  }
}

const Artwork = (props) => {
  const { id, img, del } = props;

  return (
    <div className="artCard">
      <img src={img}></img>
      <br />
      <button className="delete" onClick={() => del(id)}>
        delete
      </button>{' '}
      &nbsp; &nbsp; &nbsp;
      <button className="delete">comment</button>
    </div>
  );
};

export default UserDisplay;
