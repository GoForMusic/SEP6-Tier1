import React, { useEffect } from "react";
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
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm")); // small screens
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md")); // medium screens
  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg")); // large screens

  let cols;
  if (matchDownSm) {
    cols = 1; // 1 column for small screens
  } else if (matchDownMd) {
    cols = 2; // 2 columns for medium screens
  } else if (matchDownLg) {
    cols = 3; // 3 columns for large screens
  } else {
    cols = 5; // 5 columns for extra large screens
  }

  const imageListWidth = `calc((290px * ${cols}) + (12px * ${cols - 1}))`;

  const movies = useSelector((state: RootState) => state.movieReducer.movies);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(filterByYear("1998", 0));
  }, [dispatch]);

  return (
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
  );
};

export default Home;
