import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  POST_LIKES_REQUEST,
  POST_LIKES_SUCCESS,
  FETCH_LIKES_REQUEST,
  FETCH_LIKES_SUCCESS,
} from "../../constants/likes";
import { addLike, fetchLikes } from "../../thunks/likesThunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Like Comment Thunk", () => {
  it("dispatches POST_LIKES_REQUEST and POST_LIKES_SUCCESS when liking a comment is successful", async () => {
    const commentId = "123";
    const expectedActions = [
      { type: POST_LIKES_REQUEST },
      { type: POST_LIKES_SUCCESS },
    ];

    const store = mockStore({});
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    await store.dispatch(addLike(commentId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatches FETCH_LIKES_REQUEST and FETCH_LIKES_SUCCESS when fetching likes is successful", async () => {
    const commentId = "123";
    const movieId = "456";
    const expectedActions = [
      { type: FETCH_LIKES_REQUEST },
      { type: FETCH_LIKES_SUCCESS, payload: {} },
    ];

    const store = mockStore({});
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    await store.dispatch(fetchLikes(commentId, movieId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
