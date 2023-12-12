import React, { useEffect } from "react";
import "./home.css";
import type { RootState, AppDispatch } from "../../store";
import { filterByYear } from "../../thunks/filterThunk";
import { useDispatch, useSelector } from "react-redux";
import { Button, ImageList, ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { nextPage, prevPage } from "../../Actions/pagination";
import {
  calculateNumberOfCols,
  calculateImageListWidth,
  ImageListItemStyled,
  ImgStyled,
} from "../../components/home/Styling/home_style";
import Loader from "../loader";
// import search from "../search/searchContainer";
import Pagination from "../pagination/pagination";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const Home = () => {
  const theme = useTheme();

  const movies = useSelector((state: RootState) => state.movieReducer.movies);
  const page = useSelector((state: RootState) => state.movieReducer.page);
  const isLoading = useSelector(
    (state: RootState) => state.movieReducer.loading
  );

  const dispatch: AppDispatch = useDispatch();

  const handlePrevClick = () => {
    dispatch(prevPage());
  };

  const handleNextClick = () => {
    dispatch(nextPage());
  };

  // const handleBookmarkClick = (movieId) => {
  //   if (bookmarkedMovies.includes(movieId)) {
  //     dispatch(removeBookmark(movieId)); // Remove from bookmarks
  //   } else {
  //     dispatch(addBookmark(movieId)); // Add to bookmarks
  //   }
  // };

  useEffect(() => {
    dispatch(filterByYear("2012", page));
  }, [dispatch, page]);

  const handleBookmarkClick = (movieId) => {
    // Logic to bookmark the movie
    console.log(`Bookmark movie with ID: ${movieId}`);
  };

  const handleBarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <>
      {isLoading && <Loader />} {/* Show loader when isLoading is true */}
      <ImageList
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
                    startIcon={<BookmarkBorderIcon />}
                    onClick={() => handleBookmarkClick(movie.id)}
                  ></Button>
                }
                onClick={handleBarClick}
              />
            </Link>
          </ImageListItemStyled>
        ))}
      </ImageList>
      {!isLoading && movies.length > 5 && (
        <Pagination
          page={page}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
      )}
    </>
  );
};

export default Home;
