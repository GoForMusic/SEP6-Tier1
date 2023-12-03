import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filterByYear } from "../thunks/filterThunk";
import { filterByDirector } from "../thunks/filterThunk";
import type { RootState, AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

const FilterComponent = () => {
  const [showYears, setShowYears] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Using useSelector to get data from the Redux store
  const movies = useSelector((state: RootState) => state.filterReducer.movies);
  const directors = useSelector(
    (state: RootState) => state.filterReducer.movies
  );

  console.log("Directors: ", directors);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const toggleYears = () => {
    setShowYears(!showYears);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleYearSelection = (year) => {
    console.log("Selected Year:", year);
    setSelectedYear(year);
    setShowSearchBar(false);

    // Dispatch the thunk based on the selected year
    dispatch(filterByYear(year)).catch((error) =>
      console.error("Error:", error)
    );
  };

  const handleSearch = () => {
    // Dispatch the thunk based on the search query
    dispatch(filterByDirector(searchQuery)).catch((error) =>
      console.error("Error:", error)
    );
    console.log("Directors after dispatching: ", directors);
  };

  const renderMovies = () => (
    <div className="mt-2">
      <h5>Movies :</h5>
      {Array.isArray(movies) && movies.length > 0 ? (
        movies.map((entry, index) => (
          <div key={index}>
            <p>{`Movie: ${entry.title} (${entry.year})`}</p>
          </div>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );

  const years = Array.from(
    { length: new Date().getFullYear() - 1950 + 1 },
    (_, index) => 1950 + index
  );
  let temp = 0;

  return (
    <div>
      <Form>
        <Form.Group controlId="searchBar" className="mb-3">
          <Form.Control type="text" placeholder="Search..." />
        </Form.Group>

        <Button variant="primary" onClick={toggleYears}>
          Filter by Year
        </Button>

        <Button variant="secondary" onClick={toggleSearchBar} className="ml-2">
          Search by Name
        </Button>

        {showYears && (
          <div className="mt-2">
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "info" : "light"}
                onClick={() => handleYearSelection(year)}
                className="mr-2 mb-2"
              >
                {year}
              </Button>
            ))}
          </div>
        )}

        {movies && movies.length > 0 && renderMovies()}

        <Form.Group controlId="searchBar" className="mb-3">
          {showSearchBar && (
            <>
              <Form.Control
                type="text"
                placeholder="Search by Director Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </>
          )}
        </Form.Group>
        {directors && directors.length > 0 && (
          <div className="mt-2">
            <h5>Movies by director:</h5>

            <ul>
              {directors.map((item, index) => (
                <li key={index}>{item.movie_id?.title}</li>
              ))}
            </ul>
          </div>
        )}
      </Form>
    </div>
  );
};

export default FilterComponent;
