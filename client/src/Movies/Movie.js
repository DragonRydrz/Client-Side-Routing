import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class MovieCard extends React.Component {
  
  state = {
    movie: null,
  };

  componentDidMount() {
    // change this line to grab the id passed on the URL
    // const id = Number(this.props.location.pathname[this.props.location.pathname.length -1]);
    
    const id = this.props.match.params.movieNumber;
    
    
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => this.setState(() => ({ movie: response.data })))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if(!this.state.movie) {
      return <div>Loading movie information...</div>
    }
    const buttonStyle = {
      margin: '100px 20px',

    }
    const { title, director, metascore, stars } = this.state.movie;
    return (
      <div>
        <div className="movie-card">
          <h2>{title}</h2>
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <h3>Actors</h3>

          {stars.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))}
        </div>
        <Link style={buttonStyle} to="/">Home</Link>
      </div>
    );
  }
}
