import React, { useEffect, useState } from "react";
import "./WatchList.css";
import type { AppDispatch, RootState } from "../../store";

import { useDispatch, useSelector } from "react-redux";
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
import { removeFromWatchlist } from "../../Service/WatchList";
import { fetchWatchlist } from "../../thunks/moviesThunk";

const WatchList = () => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();

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

  const movies = useSelector(
    (state: RootState) => state.movieReducer.watchList
  );

  useEffect(() => {
    dispatch(fetchWatchlist(userId));
  }, [userId, page, refreshTrigger, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
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
