import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { filterByYear } from '../thunks/filterThunk';
import type { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';

const FilterComponent = () => {
  const [showYears, setShowYears] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);

  // Using useSelector to get data from the Redux store
  const movies = useSelector((state: RootState) => state.filterReducer.movies);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const toggleYears = () => {
    setShowYears(!showYears);
  };

  const handleYearSelection = (year) => {
    console.log('Selected Year:', year);
    setSelectedYear(year);

    // Dispatch the thunk based on the selected year
    dispatch(filterByYear(year)).catch((error) => console.error('Error:', error));
  };

  const renderMovies = () => (
    <div className="mt-2">
      <h5>Filtered Movies:</h5>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{`${movie.title} (${movie.year})`}</li>
        ))}
      </ul>
    </div>
  );

  const years = Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, index) => 1950 + index);

  return (
    <div>
      <Form>
        <Form.Group controlId="searchBar" className="mb-3">
          <Form.Control type="text" placeholder="Search..." />
        </Form.Group>

        <Button variant="primary" onClick={toggleYears}>
          Filter by Year
        </Button>

        {showYears && (
          <div className="mt-2">
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? 'info' : 'light'}
                onClick={() => handleYearSelection(year)}
                className="mr-2 mb-2"
              >
                {year}
              </Button>
            ))}
          </div>
        )}

        {movies && movies.length > 0 && renderMovies()}
      </Form>
    </div>
  );
};

export default FilterComponent;
