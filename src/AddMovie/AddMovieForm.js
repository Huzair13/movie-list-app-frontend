import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../CustomStyles/styles.css';

const MovieForm = () => {
  const [movieData, setMovieData] = useState({
    movieName: '',
    language: '',
    director: '',
    releaseYear: '',
    rating: '',
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedMovieData = {
        ...movieData,
        releaseYear: parseInt(movieData.releaseYear),
        rating: parseFloat(movieData.rating),
      };
  

      console.log(updatedMovieData);
      const response = await axios.post('http://44.211.90.107:8100/addMovies', updatedMovieData);
      console.log(response.data);
  

    } catch (error) {
      console.error('Error adding movie:', error);
    }

    navigate('/');
      
    setTimeout(() => {
        window.location.reload();
        }, 500);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center title">Add New Movie</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="movieName" className="form-label label_color">
            Name:
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="movieName"
            name="movieName"
            value={movieData.movieName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label label_color">
            Language:
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="language"
            name="language"
            value={movieData.language}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="director" className="form-label label_color">
            Director:
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="director"
            name="director"
            value={movieData.director}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="releaseYear" className="form-label label_color">
            Release Year:
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="releaseYear"
            name="releaseYear"
            value={movieData.releaseYear}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label label_color">
            Rating:
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="rating"
            name="rating"
            value={movieData.rating}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
