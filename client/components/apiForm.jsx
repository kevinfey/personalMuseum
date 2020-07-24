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
      images: [],
      titles: [],
    };

    this.query = this.query.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.save = this.save.bind(this);
    this.getTen = this.getTen.bind(this);
  }

  query(search) {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`
    )
      .then((res) => res.json())
      .then((artworks) => {
        const length = artworks.objectIDs.length;
        const loopLength = Math.min(14, length);
        for (let i = 0; i < loopLength; i += 1) {
          this.getTen(artworks.objectIDs[i]);
        }
        console.log('images', this.state.images);

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

  getTen(objId) {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objId}`
    )
      .then((res) => res.json())
      .then((image) => {
        console.log('inside getTen', image.title);
        const newState = this.state.images;
        const newStateTitles = this.state.titles;
        newState.push(image.primaryImageSmall);
        newStateTitles.push(image.title);
        return this.setState({
          images: newState,
          titles: newStateTitles,
        });
      });
  }

  save(imgURL) {
    console.log('id', this.props);
    const payload = {
      img: imgURL,
      id: this.props.id,
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
    let renderArr = [];

    this.state.images.forEach((e, i) => {
      renderArr.push(
        <ArtRender
          key={i}
          title={this.state.titles[i]}
          img={e}
          save={this.save}
        />
      );
    });

    renderArr = renderArr.reverse();

    return (
      <div>
        <label>Search for an Artist, Title, or Subject</label>
        <br />
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
        <button
          onClick={() => {
            this.props.refresh();
            this.setState(() => ({
              images: [],
              titles: [],
            }));
          }}
        >
          Refresh
        </button>

        <div className="searchCardContainer">{renderArr}</div>
        <div></div>
      </div>
    );
  }
}

export default ApiForm;
