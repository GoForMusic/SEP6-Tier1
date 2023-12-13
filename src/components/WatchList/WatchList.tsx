import React, { useEffect, useState } from "react";
import "./WatchList.css";
import type { RootState } from "../../store";

import { useSelector } from "react-redux";
import { Button, ImageList, ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  calculateNumberOfCols,
  calculateImageListWidth,
  ImageListItemStyled,
  ImgStyled,
} from "./Styling/watch_list_style";
import Loader from "../loader";
import Pagination from "../pagination/pagination";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { getFromWatchlist, removeFromWatchlist } from "../../Service/WatchList";
import { fetchFromTMDB_api } from "../../HelperFunctions/fetchApi";

const WatchList = () => {
  const theme = useTheme();

  const [page, setPage] = useState(1);

  const handlePrevClick = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBookmarkClick = async (e, watchListMovieId) => {
    try {
      await removeFromWatchlist(watchListMovieId);
      setRefreshTrigger((oldValue) => oldValue + 1);
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };

  const handleBarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const userId = useSelector(
    (state: RootState) => state.loginUserReducer.userId
  );
  const isLoading = useSelector(
    (state: RootState) => state.movieReducer.loading
  );

  // Local state for movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const watchlistData = await getFromWatchlist(userId, page);
        const moviesWithDetails = await Promise.all(
          watchlistData.map(async (entry) => {
            const details = await fetchMovieDetails(entry.movie_id.id);
            return {
              ...entry.movie_id,
              watchlistId: entry.id,
              ...details,
            };
          })
        );
        setMovies(moviesWithDetails);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
      }
    };

    if (userId) {
      fetchWatchlist();
    }
  }, [userId, page, refreshTrigger]);

  return (
    <>
      {isLoading && <Loader />} {/* Show loader when isLoading is true */}
      <ImageList
        key={refreshTrigger}
        cols={calculateNumberOfCols(theme)}
        rowHeight={435}
        gap={12}
        style={{
          overflow: "hidden",
          width: calculateImageListWidth(theme),
          margin: "auto",
        }}
      >
        {movies.map((movie) => (
          <ImageListItemStyled key={movie.id} style={{ width: "290px" }}>
            <Link to={`/movie/${movie.id}`}>
              {movie.poster && (
                <ImgStyled src={`${movie.poster}`} alt={movie.title} />
              )}
              <ImageListItemBar
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                title={movie.title}
                subtitle={
                  <span>
                    {movie.genres && movie.genres.length > 0
                      ? movie.genres.join(", ")
                      : "No Genres found"}
                  </span>
                }
                actionIcon={
                  <Button
                    startIcon={<BookmarkRemoveIcon sx={{ color: "red" }} />}
                    onClick={(e) => handleBookmarkClick(e, movie.watchlistId)}
                  ></Button>
                }
                onClick={handleBarClick}
              />
            </Link>
          </ImageListItemStyled>
        ))}
      </ImageList>
      {!isLoading && !movies && (
        <Pagination
          page={page}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
          isNextDisabled={movies.length <= 20}
        />
      )}
    </>
  );
};

export default WatchList;

const fetchMovieDetails = async (movieId) => {
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
