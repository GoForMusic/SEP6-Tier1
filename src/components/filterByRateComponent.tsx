import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { filterByRate } from '../thunks/filterByRateThunk'; // Make sure to import the correct path
import type { RootState, AppDispatch } from '../store';

const FilterByRateComponent = () => {
  const [showRates, setShowRates] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);

  // Using useSelector to get data from the Redux store
  const movies = useSelector((state: RootState) => state.filterByRateReducer.movies);

  const dispatch: AppDispatch = useDispatch();

  const toggleRates = () => {
    setShowRates(!showRates);
  };

  const handleRateSelection = (rate) => {
    console.log('Selected Rate:', rate);
    setSelectedRate(rate);

    // Dispatch the thunk based on the selected rate
    dispatch(filterByRate(rate)).catch((error) => console.error('Error:', error));
  };

  const renderMovies = () => (
    <div className="mt-2">
      <h5>Filtered Movies:</h5>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{` Title:  ${movie?.movie_id.title}  Rating: ${movie?.ratingValue}    Year:  ${movie?.movie_id.year}`}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <Form>
        <Button variant="primary" onClick={toggleRates}>
          Filter by Rate
        </Button>

        {showRates && (
          <div className="mt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rate) => (
              <Button
                key={rate}
                variant={selectedRate === rate ? 'info' : 'light'}
                onClick={() => handleRateSelection(rate)}
                className="mr-2 mb-2"
              >
                {rate}
              </Button>
            ))}
          </div>
        )}

        {movies && movies.length > 0 && renderMovies()}
      </Form>
    </div>
  );
};

export default FilterByRateComponent;
