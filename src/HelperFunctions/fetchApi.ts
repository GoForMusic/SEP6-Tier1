//##########################################################################################
//ABSTRACT LOGIC FOR CODE REUSABILITY: (this piece is always used with each request,
//        since we have many same kind of requests, there was a need to create such function
//          so that the code would be reused. It also makes it more simple to read)

import { MovieData } from "../Interfaces/MovieData";
import fetchJsonp from "./fetchJsonp";
import { MovieDataDb } from "../Interfaces/MovieDataDb";

///api url wrapped within constant - bcs it is the same for all req and used in many places.

const API_BASE_URL = "https://tier2.azurewebsites.net";
const TMDB_BASE_URL = "https://api.themoviedb.org";
const TMDB_apiKey = "7ab06a3836f7b4eac34256dcaa05a6c7";

export async function fetchFromAzure(endpoint: string, method: string = "GET") {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    mode: "cors",
    method: method,
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

export async function fetchFromTMDB_api(movieId: string): Promise<MovieData> {
  const url = `${TMDB_BASE_URL}/3/movie/${movieId}?api_key=${TMDB_apiKey}`;
  try {
    const response = await fetchJsonp(url, "callbackFunctionName");
    return response as MovieData; // Type assertion to MovieData
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}


export const fetchMovieDetails = async (movie) => {
  let goodString = movie.id.toString().padStart(7, "0");
  try {
    const movieData = await fetchFromTMDB_api(`tt${goodString}`);
    const posterPath = movieData.poster_path
      ? `https://image.tmdb.org/t/p/original/${movieData.poster_path}`
      : "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg";
    const genres = movieData.genres.map((genre) => genre.name);

    return {
      ...movie,
      poster: posterPath,
      genres: genres,
    };
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movie.id}:`, error);
    return {
      ...movie,
      poster: "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg",
      genres: [],
    };
  }
};