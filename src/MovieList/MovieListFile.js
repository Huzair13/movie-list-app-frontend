import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movies !== this.props.movies) {
      this.fetchMovieData();
    }
  }

  handleDelete = async (movieName) => {
    try {
      const action= window.confirm("Are you sure to delete?");
      if(action){
        const endpoint = `http://localhost:8100/delete`;

        console.log('DELETE endpoint:', endpoint);
        const response = await axios.delete(endpoint, {
          data: { movieName: movieName } // Use 'data' to send the request body
        });
        console.log('DELETE response:', response);
        console.log('Delete successful:', response.data);
        window.location.reload();
      }
      else{
        console.log("Deletion cancelled");
      }
      
    } catch (error) {
      console.error('Error deleting movie:', error.message);
    }
  };

  componentDidMount() {
    this.fetchMovieData();
  }

  fetchMovieData = async () => {
    const { movies } = this.props;
    const apiKey = '5aefe5fe';
    const baseUrl = 'https://www.omdbapi.com/';
  
    const moviePosters = await Promise.all(
      movies.map(async (movie) => {
        try {
          console.log(movie)
          const response = await axios.get(
            `${baseUrl}?apikey=${apiKey}&t=${encodeURIComponent(movie)}&type=movie`
          );
  
          console.log(`${baseUrl}?apikey=${apiKey}&t=${encodeURIComponent(movie)}&type=movie`)
          const data = response.data;
          console.log(response.data)
  
          if (data && data.Title && data.Type === 'movie') {
            return {
              name: data.Title, // Use data.Title for consistency
              poster: data.Poster,
            };
          } else {
            return {
              name: movie.movieName, // Fallback to movieName in case of error
              poster: null,
            };
          }
        } catch (error) {
          console.error(`Error fetching data for ${movie}`, error);
          return null;
        }
      })
    );
  
    const movieResults = moviePosters.filter(
      (movie) => movie !== null && typeof movie.name === 'string'
    );
    this.setState({ movieData: movieResults });
  };
  

  render() {
    const { movieData } = this.state;

    return (
      <div className="container mt-5">
        <div className="row">
          {movieData
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((movie, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      className="card-img-top"
                      alt={`${movie.name} Poster`}
                      style={{ height: '500px' }}
                    />
                  ) : (
                    <div className="no-poster">
                      <p>No Image Found</p>
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{movie.name}</h5>
                    <button
                      style={{ marginRight: '8px' }}
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(movie.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default MovieList;
