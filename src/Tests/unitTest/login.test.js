import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login, logout } from "../../thunks/loginUserThunk";

import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQ,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGOUT_FAIL,
} from "../constants/userLogin";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userLogin = "login";
const userPassoword = "password";
const expectedActions = [
  { type: USER_LOGIN_REQ },
  { type: USER_LOGIN_SUCCESS },
];

describe("Login user", () => {
  it("dispatched USER_LOGIN_REQ, USER_LOGIN_SUCCESS ", async () => {
    const userLogin = "login";
    const userPassoword = "password";
    const expectedActions = [
      { type: USER_LOGIN_REQ },
      { type: USER_LOGIN_SUCCESS },
    ];

    const store = mockStore({});
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 0,
            userName: "string",
            password: "string",
          }),
      })
    );

    await store.dispatch(login(userLogin, userPassoword));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatches USER_LOGIN_REQ and does not dispatch USER_LOGIN_SUCCESS when fetching comments fails", async () => {
    const userLogin = "login";
    const userPassoword = "password";
    const expectedActions = [{ type: USER_LOGIN_REQ }];
    const store = mockStore({});

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: "Not Found",
      })
    );

    await store.dispatch(login(userLogin, userPassoword));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

// it("dispatches USER_LOGOUT", async () => {
//     const userLogin = "login";
//     const expectedActions = [{ type: USER_LOGOUT }];
// })
