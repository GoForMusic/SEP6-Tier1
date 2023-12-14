import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { addComment } from "../../thunks/commentsThunk";
import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
} from "../../constants/comments";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("addComments Thunk", () => {
  it("dispatches POST_COMMENT_REQUEST and POST_COMMENT_SUCCESS when the call is successfull ", async () => {
    const movieId = "5";
    const expectedActions = [
      { type: POST_COMMENT_REQUEST },
      { type: POST_COMMENT_SUCCESS },
    ];

    const store = mockStore({});
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 0,
            body: "string",
            date_posted: "2023-12-14T13:32:18.291Z",
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

    await store.dispatch(addComment("Test", "123", "456"));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatches POST_COMMENT_REQUEST and does not dispatch POST_COMMENT_SUCCESS when fetching comments fails", async () => {
    const movieId = "5";
    const expectedActions = [{ type: POST_COMMENT_REQUEST }];
    const store = mockStore({});

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: "Not Found",
      })
    );

    await store.dispatch(addComment(movieId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
