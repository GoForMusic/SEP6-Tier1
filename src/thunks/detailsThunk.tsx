import { Dispatch } from "redux";
import { fetchFromAzure, fetchFromTMDB_api } from "../HelperFunctions/fetchApi";


const fetchMovieDetails = async (movie) => {
    let goodString = movie.id.toString().padStart(7, "0");
    try {
      const movieData = await fetchFromTMDB_api(`tt${goodString}`);
      movie.poster = movieData.poster_path
        ? `https://image.tmdb.org/t/p/original/${movieData.poster_path}`
        : "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg";
      movie.genres = movieData.genres.map((genre) => genre.name);
      movie.overview = movieData.overview;
      movie.title = movieData.Title;
      movie.runtime = movieData.Runtime;
      movie.language = movieData.original_language;
    } catch (error) {
      console.error(`Error fetching details for movie ID ${movie.id}:`, error);
      movie.poster =
        "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg";
    }
  };


  