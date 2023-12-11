import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchFromTMDB_api } from "../../HelperFunctions/fetchApi";
import type { RootState, AppDispatch } from "../../store";
import {
    ImgStyled,
  } from "../../components/home/Styling/home_style";
  import CommentComponent from '../comments/commentComponent'
  import { FacebookShareButton, WhatsappShareButton } from "react-share";


import "./details.css"; 

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const movies = useSelector((state: RootState) => state.movieReducer.movies);

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
          language: movieData.original_language, 
          vote: movieData.vote_average
          // Add other movie details as needed
        });
      } catch (error) {
        console.error(`Error fetching details for movie ID ${movieId}:`, error);
        setMovieDetails(null); // Handle error state if needed
      } finally {
        setLoading(false)
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <p>Loading...</p>; // or handle loading/error state in a different way
  }

  const currentMovie = movies.find((movie) => movie.id === Number(movieId));

  if (!currentMovie) {
    return <p>Movie not found</p>;
  }

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  const shareUrl = window.location.href;

  return (
    <div className="movie-details-container">
      <h1 className="movie-details-title">{movieDetails.title}</h1>
      <p className="movie-details-genres">
        <strong>Genres:</strong> {movieDetails.genres.join(", ")}
      </p>
      <p className="movie-details-overview">
        <strong>Overview:</strong> {movieDetails.overview}
      </p>
      <p className="movie-details-year">
        <strong>Year:</strong> {movieDetails.year}
      </p>
      <p className="movie-details-language">
        <strong>Language:</strong> {movieDetails.language}
      </p>
      <p>
        <strong>IDMB Vote:</strong> {movieDetails.vote}
      </p>
      <div>
        <ImgStyled src={currentMovie.poster} alt={currentMovie.title} />
      </div>
    
      <CommentComponent movieId={movieId} />
      <button onClick={copy}>{!copied ? "Copy link" : "Copied!"}</button>
      <div>
        <FacebookShareButton url={shareUrl} title={movieDetails.title}>
          Share on Facebook
        </FacebookShareButton>
        <br/>
        <WhatsappShareButton url={shareUrl} title={movieDetails.title}>
          Share on Whatsapp
        </WhatsappShareButton>
        {/* Add more share buttons as needed */}
      </div>
    </div>
  );
};

  
export default MovieDetails;