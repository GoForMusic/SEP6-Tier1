import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login } from "../../thunks/loginUserThunk";

import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQ,
  USER_LOGIN_FAIL,
} from "../../constants/userLogin";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userLogin = "login";
const userPassoword = "password";
const expectedActions = [
  { type: USER_LOGIN_REQ, payload: "" },
  { type: USER_LOGIN_SUCCESS },
];

describe("Login user", () => {
  it("dispatched USER_LOGIN_REQ, USER_LOGIN_SUCCESS ", async () => {
    const userLogin = "login";
    const userPassoword = "password";
    const expectedActions = [
      { type: USER_LOGIN_REQ },
      {
        type: USER_LOGIN_SUCCESS,
        payload: { userId: undefined, username: "string" },
      },
    ];

    const store = mockStore({});
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            userName: "string",
            password: "string",
          }),
      })
    );

    await store.dispatch(login(userLogin, userPassoword));
    expect(store.getActions()).toEqual(expectedActions);
  });

  //   it("dispatches USER_LOGIN_REQ and does not dispatch USER_LOGIN_SUCCESS when fetching comments fails", async () => {
  //     const userLogin = "login";
  //     const userPassoword = "password";
  //     const expectedActions = [{ type: USER_LOGIN_FAIL }];
  //     const store = mockStore({});

  //     global.fetch = jest.fn().mockImplementation(() =>
  //       Promise.resolve({
  //         ok: false,
  //         statusText: "Not Found",
  //       })
  //     );

  //     await store.dispatch(login(userLogin, userPassoword));
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
});
