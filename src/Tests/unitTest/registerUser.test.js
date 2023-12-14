import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { registerAccount } from "../../thunks/registerAccountThunk";

import {
  USER_REGISTER_REQ,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../../constants/userRegister";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("register user Thunk ", () => {
  // it("Dispatches post, comment and fail ", async () => {
  //   const username = "testUsername";
  //   const passowrd = "testPassword";
  //   const expectedActions = [
  //     { type: USER_REGISTER_REQ },
  //     {
  //       type: USER_REGISTER_SUCCESS,
  //       payload: { id: 0, userName: "string", password: "string" },
  //     },
  //     { type: USER_REGISTER_FAIL, payload: { message: "Error message" } },
  //   ];

  //   const store = mockStore({});
  //   global.fetch = jest.fn().mockImplementation(() =>
  //     Promise.resolve({
  //       ok: true,
  //       json: () =>
  //         Promise.resolve({
  //           id: 0,
  //           userName: "string",
  //           password: "string",
  //         }),
  //     })
  //   );

  //   await store.dispatch(registerAccount(username, passowrd));
  //   expect(store.getActions()).toEqual(expectedActions);
  // });

  it("dispatches USER_REGISTER_REQ and USER_REGISTER_FAIL when the call fails", async () => {
    const username = "testuser";
    const password = "testpassword";
    const expectedActions = [
      { type: USER_REGISTER_REQ },
      { type: USER_REGISTER_FAIL, payload: "Error message" },
    ];

    const store = mockStore({});
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Error message" }),
      })
    );

    await store.dispatch(registerAccount(username, password));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
