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
