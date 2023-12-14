import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  CHANGE_PASSWORD_REQ,
  CHANGE_PASSWORD_SUCCESS,
} from "../../constants/profile";
import { changePassword } from "../../thunks/profileThunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("updatePassword Thunk", () => {
  it("dispatches UPDATE_PASSWORD_REQ and UPDATE_PASSWORD_SUCCESS when the call is successful", async () => {
    const userId = "123";
    const newPassword = "newpassword";
    const expectedActions = [
      { type: CHANGE_PASSWORD_REQ },
      { type: CHANGE_PASSWORD_SUCCESS },
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

    await store.dispatch(changePassword(userId, newPassword));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatches UPDATE_PASSWORD_REQ and UPDATE_PASSWORD_FAIL when the call fails", async () => {
    const userId = "123";
    const newPassword = "newpassword";
    const expectedActions = [
      { type: CHANGE_PASSWORD_REQ },
      { type: CHANGE_PASSWORD_SUCCESS, payload: "Error message" },
    ];

    const store = mockStore({});
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Error message" }),
      })
    );

    await store.dispatch(changePassword(userId, newPassword));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
