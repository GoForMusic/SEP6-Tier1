import { fetchFromTMDB_api } from "../HelperFunctions/fetchApi";
const API_BASE_URL = "https://tier2.azurewebsites.net";

export const addToWatchlist = async (account_id: any, movie_id: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/WatchList`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_id: account_id,
        movie_id: movie_id,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(
      "There was a problem adding the movie to the watchlist:",
      error
    );
  }
};

export const removeFromWatchlist = async (watchlistMovieId: any) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/WatchList/${watchlistMovieId}`,
      {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error(
      "There was a problem removing the movie from the watchlist:",
      error
    );
  }
};

export const getFromWatchlist = async (account_id: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/WatchList/${account_id}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(
      "There was a problem fetching the movies from the watchlist:",
      error
    );
  }
};

export const fetchMovieDetails_ForWatchlist = async (movieId) => {
  let goodString = movieId.toString().padStart(7, "0");
  try {
    const movieData = await fetchFromTMDB_api(`tt${goodString}`);
    return {
      poster: movieData.poster_path
        ? `https://image.tmdb.org/t/p/original/${movieData.poster_path}`
        : "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg",
      genres: movieData.genres.map((genre) => genre.name),
    };
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return {
      poster: "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg",
      genres: [],
    };
  }
};
