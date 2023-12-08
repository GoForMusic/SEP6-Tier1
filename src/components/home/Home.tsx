import React, { useEffect, useState } from "react";
import "./home.css";
import type { RootState, AppDispatch } from "../../store";
import { filterByYear } from "../../thunks/filterThunk"; // Make sure to import the correct path
import { useDispatch, useSelector } from "react-redux";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { nextPage, prevPage } from "../../Actions/pagination";

// PUT IN COMPONENTS:
const ImgStyled = styled("img")({
  width: "290px",
  height: "435px",
  objectFit: "cover",
});

const ImageListItemStyled = styled(ImageListItem)({
  overflow: "hidden",
});

const Home = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // xs screens
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // sm screens
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // md screens
  const isLg = useMediaQuery(theme.breakpoints.only("lg")); // lg screens
  const isXl = useMediaQuery(theme.breakpoints.up("xl")); // xlg screens > up

  let cols;
  if (isXs) {
    cols = 1;
  } else if (isSm) {
    cols = 2;
  } else if (isMd) {
    cols = 3;
  } else if (isLg) {
    cols = 4;
  } else if (isXl) {
    cols = 5;
  }

  const imageListWidth = `calc((290px * ${cols}) + (12px * ${cols - 1}))`;

  const movies = useSelector((state: RootState) => state.movieReducer.movies);
  const page = useSelector((state: RootState) => state.movieReducer.page);
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
      <ImageList
        cols={cols}
        rowHeight={435}
        gap={12}
        style={{
          overflow: "hidden",
          width: imageListWidth,
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

      <div
        style={{
          display: "flex", // Use flexbox
          justifyContent: "center", // Center children horizontally
          alignItems: "center", // Center children vertically (if needed)
          flexDirection: "row", // Arrange children in a row
          gap: "10px", // Puts space between the children
        }}
      >
        <button onClick={handlePrevClick}>Previous</button>
        <p>{page}</p>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </>
  );
};

export default Home;
