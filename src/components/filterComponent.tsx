// FilterComponent.jsx
import React, { useState } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { filterByRate, filterByGenre, filterByDirector } from '../thunks/filterByRateThunk'; 
import type { RootState, AppDispatch } from '../store'

const FilterComponent = () => {
  const [showFilters, setShowFilters] = useState(false);
  

  const dispatch: AppDispatch = useDispatch();


  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // commenting it out so I can push, will get back to it 

  const handleFilterSelection = (selectedFilter) => {
    // Handle the selected filter, you can perform additional actions based on the selected filter
    console.log('Selected Filter:', selectedFilter);

    // Dispatch the thunk based on the selected filter
    if (selectedFilter === 'Filter by Rate') {
      dispatch(filterByRate(selectedFilter));
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="searchBar" className="mb-3">
          <Form.Control type="text" placeholder="Search..." />
        </Form.Group>

        <Button variant="primary" onClick={toggleFilters}>
          Filter
        </Button>

        {showFilters && (
          <Dropdown className="mt-2">
            <Dropdown.Toggle variant="secondary" id="filterDropdown">
              Select Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onSelect={() => handleFilterSelection('Filter by Rate')}>
                Filter by Rate
              </Dropdown.Item>
              {/* Add more filter options as needed */}
              <br>
              </br>
              <Dropdown.Item onSelect={() => handleFilterSelection('Filter by Rate')}>
                Filter by Genre
              </Dropdown.Item>
              <br>
              </br>
              <Dropdown.Item onSelect={() => handleFilterSelection('Filter by Rate')}>
                Filter by Director
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Form>
    </div>
  );
};

export default FilterComponent;
