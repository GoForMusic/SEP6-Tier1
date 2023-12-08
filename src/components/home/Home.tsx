import React, { useEffect } from "react";
import "./home.css";
import type { RootState, AppDispatch } from "../../store";
import { filterByYear } from "../../thunks/filterThunk"; // Make sure to import the correct path
import { useDispatch, useSelector } from "react-redux";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { nextPage, prevPage } from "../../Actions/pagination";
import {
  calculateNumberOfCols,
  calculateImageListWidth,
  ImageListItemStyled,
  ImgStyled,
} from "../../components/home/Styling/home_style";
import Loader from "../loader";
import Pagination from "../pagination/pagination";

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

  useEffect(() => {
    dispatch(filterByYear("1998", page));
  }, [dispatch, page]);

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
                title={movie.title}
                subtitle={<span>{movie.id}</span>}
              />
            </Link>
          </ImageListItemStyled>
        ))}
      </ImageList>
      {!isLoading && (
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
