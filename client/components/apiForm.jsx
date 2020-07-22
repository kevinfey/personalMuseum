import React, { Component } from 'react';
import ArtRender from './artRender.jsx';
import './App.css';

class ApiForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artworks: {
        total: 43,
        objectIDs: [],
      },
      single: '',
    };

    this.query = this.query.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.save = this.save.bind(this);
  }

  query(search) {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`
    )
      .then((res) => res.json())
      .then((artworks) => {
        this.getSingle(artworks.objectIDs[0]);

        //Put back in Later
        //console.log('inside query', artworks);
        return this.setState({
          artworks,
        });
      })
      .catch((err) => console.log('Query ERROR: ', err));
  }

  getSingle(objId) {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objId}`
    )
      .then((res) => res.json())
      .then((single) => {
        console.log('inside getSingle', single);
        return this.setState({
          single,
        });
      });
  }

  save() {
    const payload = {
      img: this.state.single.primaryImageSmall,
    };
    fetch('/api/art', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <div>
        <label> Search</label>
        <div></div>
        <input id="inputField" type="text" name="search"></input>
        <button
          onClick={() => {
            const searchValue = document.querySelector('#inputField').value;
            console.log('searchValue', searchValue);
            document.querySelector('#inputField').value = '';
            this.query(searchValue);
          }}
        >
          Query
        </button>

        <div>
          <ArtRender value={this.state.single} />
        </div>
        <div>
          <img src={this.state.single.primaryImageSmall}></img>
        </div>
        <button onClick={() => this.save()}>Save</button>
      </div>
    );
  }
}

export default ApiForm;
