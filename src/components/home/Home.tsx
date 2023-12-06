import React, { useEffect } from "react";
// import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
// import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
// import Spinner from "../elements/Spinner/Spinner";
import "./home.css";
import type { RootState, AppDispatch } from "../../store";
import { filterByYear } from "../../thunks/filterThunk"; // Make sure to import the correct path
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const movies = useSelector((state: RootState) => state.filterReducer.movies);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(filterByYear("2026"));
  }, [dispatch]);

  return (
    <div className="rmdb-home">
      <div>{/* <SearchBar /> */}</div>

      <div className="rmdb-home-grid">
        <FourColGrid
        // header={searchTerm ? "Search Result" : "Popular Movies"}
        // loading={loading}
        >
          {movies.map((element, i) => (
            <MovieThumb
              key={i}
              clickable={true}
              image={
                element.poster &&
                element.poster !== "N/A" &&
                element.poster !== "null"
                  ? "https://image.tmdb.org/t/p/original" + element.poster
                  : "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg"
              }
              movieId={element.id}
              movieName={element.original_title}
            />
          ))}
        </FourColGrid>
        {/* {loading ? <Spinner /> : null}
      {currentPage <= totalPages && !loading ? (
        <LoadMoreBtn text="Load More" onClick={loadMoreMovies} />
      ) : null} */}
      </div>
    </div>
  );
};

export default Home;
