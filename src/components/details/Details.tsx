import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchFromTMDB_api } from "../../HelperFunctions/fetchApi";
import "./details.css"; 

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      let goodString = movieId.toString().padStart(7, "0");
      try {
        const movieData = await fetchFromTMDB_api(`tt${goodString}`);
        setMovieDetails({
          title: movieData.Title,
          genres: movieData.genres.map((genre) => genre.name),
          overview: movieData.overview,
          year: movieData.Year,
          language: movieData.original_language, // Add language
          // Add other movie details as needed
        });
      } catch (error) {
        console.error(`Error fetching details for movie ID ${movieId}:`, error);
        setMovieDetails(null); // Handle error state if needed
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <p>Loading...</p>; // or handle loading/error state in a different way
  }

  return (
    <div className="movie-details-container">
      <h1 className="movie-details-title">{movieDetails.title}</h1>
      <p className="movie-details-genres">Genres: {movieDetails.genres.join(", ")}</p>
      <p className="movie-details-overview">Overview: {movieDetails.overview}</p>
      <p className="movie-details-year">Year: {movieDetails.year}</p>
      <p className="movie-details-language">Language: {movieDetails.language}</p>
      {/* Display other movie details as needed */}
    </div>
  );
};

  
export default MovieDetails;