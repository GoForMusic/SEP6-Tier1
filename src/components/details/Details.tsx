import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchFromTMDB_api } from "../../HelperFunctions/fetchApi";
import { fetchFromOurDb } from '../../Service/fetchMovieId';
import type { RootState, AppDispatch } from "../../store";
import { ImgStyled } from "../../components/home/Styling/home_style";
import CommentComponent from "../comments/commentComponent";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import "./details.css";
import "./shareButtons.css"
 
 
 
const Details = () => {
  const { movieId } = useParams();  
  const [movieDetails, setMovieDetails] = useState({   title: '',   poster: '',   genres: [],   overview: '',   year: '',   language: '',   vote: 0});
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
 
  // we should not keep this into the state, therefore i will comment it out
  // const {moviesFromDb} = useSelector((state: RootState) => state.movieReducer.movies);
 
  useEffect(() => {
    console.log("e", movieId);
   
      let goodString = movieId.toString().padStart(7, "0");

      const fetchMovieDetails = async () => {

      try {

 
        // const fetched = await fetchFromOurDb(movieId);
 
        // const movieData = await fetchFromTMDB_api(`tt${goodString}`);
 
        const [fetchedFromDb, fetchedFromTMDB] = await Promise.all([
            fetchFromOurDb(movieId),
            fetchFromTMDB_api(`tt${goodString}`),
          ]);
 
          if (fetchedFromDb || fetchedFromTMDB) {
            setMovieDetails({
              title: fetchedFromDb.title,
              poster: fetchedFromTMDB.poster_path,
              genres: fetchedFromTMDB.genres.map((genre) => genre.name),
              overview: fetchedFromTMDB.overview,
              year: fetchedFromDb.year,
              language: fetchedFromTMDB.original_language,
              vote: fetchedFromTMDB.vote_average,
              // Add other movie details as needed
            });
          } else {
            // Handle cases where one or both fetches return null or undefined
            console.error("Failed to fetch movie details");
          }
        } catch (error) {
          console.error("Error fetching movie details: ", error);
        } finally {
          setLoading(false);
        }
      
   
    //   fetchMovieDetails();
    }; fetchMovieDetails();
  
  }, [movieId]);
  // if (!movieDetails) {
 
  //   return <p>Loading...</p>;
  // }
 
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
      {}
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
        {movieDetails.poster ? (
          <ImgStyled
            src={`https://image.tmdb.org/t/p/original/${movieDetails.poster}`}
            alt={movieDetails.title}
          />
        ) : (
          <p>No poster available</p> // You can replace this with your preferred message or default image
        )}
      </div>
      <CommentComponent movieId={movieId} />
      <div className="share-buttons-container">
        <button className="copy-link-button" onClick={copy}>
          {!copied ? "Copy link" : "Copied!"}
        </button>
        <div>
        <FacebookShareButton url={shareUrl} title={movieDetails.title} className="share-button">
  <i className="fab fa-facebook"></i> Facebook
</FacebookShareButton>
<br />
<WhatsappShareButton url={shareUrl} title={movieDetails.title} className="share-button">
  <i className="fab fa-whatsapp"></i> Whatsapp
</WhatsappShareButton>
 
          {/* Add more share buttons as needed */}
        </div>
     
      </div>
    </div>
  );
};
 
export default Details;