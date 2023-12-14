import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchComments } from "../../thunks/commentsThunk";
import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
} from "../../constants/comments";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("fetchComments Thunk", () => {
  it("dispatches FETCH_COMMENTS_REQUEST and FETCH_COMMENTS_SUCCESS when fetching comments is successful", async () => {
    const movieId = "5";
    const expectedActions = [
      { type: FETCH_COMMENTS_REQUEST },
      {
        type: FETCH_COMMENTS_SUCCESS,
        payload: {
          id: 0,
          body: "string",
          date_posted: "2023-12-14T13:16:03.535Z",
          writtenBy: {
            id: 0,
            userName: "string",
            password: "string",
          },
          movie_id: {
            id: 0,
            title: "string",
            year: 0,
          },
          numberOfLikes: 0,
        },
      },
    ];
    const store = mockStore({});

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 0,
            body: "string",
            date_posted: "2023-12-14T13:16:03.535Z",
            writtenBy: {
              id: 0,
              userName: "string",
              password: "string",
            },
            movie_id: {
              id: 0,
              title: "string",
              year: 0,
            },
            numberOfLikes: 0,
          }),
      })
    );

    await store.dispatch(fetchComments(movieId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatches FETCH_COMMENTS_REQUEST and does not dispatch FETCH_COMMENTS_SUCCESS when fetching comments fails", async () => {
    const movieId = "5";
    const expectedActions = [{ type: FETCH_COMMENTS_REQUEST }];
    const store = mockStore({});

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: "Not Found",
      })
    );

    await store.dispatch(fetchComments(movieId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
