// Import the action creator and any other necessary parts of your app
import { searchByTitle } from '../../../thunks/filterThunk';
import * as movieService from '../../../HelperFunctions/fetchApi';
import configureMockStore from 'redux-mock-store';
    import thunk from 'redux-thunk';

// Mock the dependent functions
jest.mock('../../../HelperFunctions/fetchApi', () => ({
  fetchFromAzure: jest.fn(),
  fetchMovieDetails: jest.fn(), 

}));

describe('searchByTitle action', () => {
    // Create a mock store with middlewares
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    it('dispatches SEARCH_MOVIES_RESPONSE after successful movie details fetch', async () => {
    
    //define initial state and pass it to the mocked store
    const initialState = { movies: [], loading: false, page: 1, searchTerm: "" };
    const store = mockStore(initialState);

    // Mock movie data as in our AZURE DB 
    const mockMovies = [
      { id: 1, title: "Movie 1", year: 1970 }
    ];

    // Mock fetchFromAzure (OUR DB) API call to return the mocked movies
    movieService.fetchFromAzure.mockResolvedValue(mockMovies);
    
    // Mock fetchMovieDetails to supplement the movie data from 2ndary API (TMDB API) 
    movieService.fetchMovieDetails.mockImplementation(movie =>
      Promise.resolve({
        ...movie,
        poster: 'some-poster-url',
        genres: ['Comedy', 'Drama']
      })
    );

    // Arrange expected behavior: 
    const expectedActions = [
      { type: 'FETCH_MOVIES_REQ' },
      {
        type: 'SEARCH_MOVIES_RESPONSE',
        payload: {
          queryData: mockMovies.map(movie => ({
            ...movie,
            poster: 'some-poster-url',
        genres: ['Comedy', 'Drama']
          })),
          title: 'Movie'
        }
      }
    ];

    // ASSERT 
    await store.dispatch(searchByTitle('Movie'));
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('dispatches error action when there is an error in fetching movies', async () => {

    const initialState = { movies: [], loading: false, page: 1, searchTerm: "" };
    const store = mockStore(initialState);

    const errorMessage = 'Error fetching movies';
    movieService.fetchFromAzure.mockRejectedValue(new Error(errorMessage));

    // Arrange the expected behavior
    const expectedActions = [
        { type: 'FETCH_MOVIES_REQ' },
        { type: 'REQ_FAILED', payload: `Error occurred: ${errorMessage}` }
    ];

    // ASSERT 
    await store.dispatch(searchByTitle('Movie'));
    expect(store.getActions()).toEqual(expectedActions);
});
});

