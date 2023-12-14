import React, { useEffect, useState } from "react";
import "./home.css";
import type { RootState, AppDispatch } from "../../store";
import {
  fetchWatchlist,
  filterByDirector,
  filterByRate,
  filterByYear,
} from "../../thunks/filterThunk";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  ImageList,
  ImageListItemBar,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
import Pagination from "../pagination/pagination";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { addToWatchlist } from "../../Service/WatchList";
import store from "../../store";

const Home = () => {
  const theme = useTheme();

  const currentYear = new Date().getFullYear(); // Get current year
  const userId = useSelector(
    (state: RootState) => state.loginUserReducer.userId
  );

  const movies = useSelector((state: RootState) => state.movieReducer.movies);
  const page = useSelector((state: RootState) => state.movieReducer.page);
  const search = useSelector(
    (state: RootState) => state.movieReducer.searchTerm
  );
  const isLoading = useSelector(
    (state: RootState) => state.movieReducer.loading
  );

  const isLoggedIn = useSelector(
    (state: RootState) => state.loginUserReducer.isLoggedIn
  );

  const [watchlistMovieIds, setWatchlistMovieIds] = useState(new Set());

  const dispatch: AppDispatch = useDispatch();

  const handlePrevClick = () => {
    dispatch(prevPage());
  };

  const handleNextClick = () => {
    dispatch(nextPage());
  };

  const [getYear, setYear] = useState(currentYear.toString());
  const [getRating, setRating] = useState("");
  const [getDirector, setDirector] = useState("");
  const [activeFilter, setActiveFilter] = useState("year"); // Set the default active filter to 'year'

  // Effect for handling filter changes
  useEffect(() => {
    if (activeFilter) {
      switch (activeFilter) {
        case "year":
          dispatch(filterByYear(getYear, page));
          break;
        case "rating":
          dispatch(filterByRate(getRating, page));
          break;
        case "director":
          dispatch(filterByDirector(getDirector, page));
          break;
        default:
          break;
      }
    }
  }, [dispatch, getYear, getRating, getDirector, page, activeFilter]);

  const handleYearChange = (event) => {
    setRating("");
    setDirector("");
    setYear(event.target.value);
    setActiveFilter("year");
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
    setYear("");
    setDirector("");
    setActiveFilter("rating");
  };

  const handleDirectorChange = (event) => {
    const value = event.target.value;
    setDirector(value);

    if (value === "") {
      // If the director input is cleared, fallback to the default year filter
      setYear(currentYear.toString());
      setRating("");
      setActiveFilter("year");
    } else {
      setYear("");
      setRating("");
      setActiveFilter("director");
    }
  };
  const reduxWatchlist = useSelector(
    (state: RootState) => state.movieReducer.watchList
  );

  useEffect(() => {
    if (isLoggedIn && userId) {
      // Dispatch action to fetch the watchlist
      dispatch(fetchWatchlist(userId));
    }
  }, [isLoggedIn, userId, dispatch]);

  useEffect(() => {
    if (reduxWatchlist) {
      const watchlistIds = reduxWatchlist.map((item) => item.id);
      setWatchlistMovieIds(new Set(watchlistIds));
      localStorage.setItem("watchlist", JSON.stringify(watchlistIds));
    }
  }, [reduxWatchlist]);

  const handleBookmarkClick = (movieId) => {
    addToWatchlist(userId, movieId).then(() => {
      setWatchlistMovieIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.add(movieId);
        localStorage.setItem("watchlist", JSON.stringify([...newIds]));
        return newIds;
      });
    });
  };

  const handleBarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const yearOptions = Array.from({ length: currentYear - 1990 }, (_, index) =>
    (currentYear - index).toString()
  );
  const ratingOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    <>
      {!search || search.trim() === "" ? (
        <div className="filter-section">
          <FormControl variant="filled" className="filter-input">
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={getYear}
              onChange={handleYearChange}
            >
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="filled" className="filter-input">
            <InputLabel id="rating-select-label">Rating</InputLabel>
            <Select
              labelId="rating-select-label"
              id="rating-select"
              value={getRating}
              onChange={handleRatingChange}
            >
              {ratingOptions.map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            placeholder="Director"
            className="filter-input"
            value={getDirector}
            onChange={handleDirectorChange}
          />
        </div>
      ) : null}
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
                  // Only display the bookmark icon if the movie is not in the watchlist
                  !watchlistMovieIds.has(movie.id) &&
                  isLoggedIn && (
                    <Button
                      startIcon={<BookmarkAddIcon sx={{ color: "green" }} />}
                      onClick={() => handleBookmarkClick(movie.id)}
                    ></Button>
                  )
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
          isNextDisabled={false}
        />
      )}
    </>
  );
};

export default Home;
