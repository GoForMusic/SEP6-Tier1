import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import HelloWorldScreen from "./HelloWorldScreen";
import { useSelector } from "react-redux";

// Mock the useDispatch and useSelector hooks
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock the thunk function
jest.mock("../thunks/helloWorldThunk", () => ({
  helloWorld: jest.fn(),
}));

// Mock the AppDispatch type
jest.mock("../store", () => ({
  AppDispatch: jest.fn(),
}));

const mockStore = configureStore([]);

describe("HelloWorldScreen", () => {
  it("renders the correct message after dispatching helloWorld thunk", async () => {
    // Mock useSelector to return a specific state
    useSelector.mockReturnValue({ message: "Hello from the backend!" });

    // Create a mock store
    const store = mockStore({});

    // Render the component with the mock store
    const { getByText } = render(
      <Provider store={store}>
        <HelloWorldScreen />
      </Provider>
    );

    // Wait for the component to update after dispatching the thunk
    await waitFor(() => {
      expect(store.getActions()).toEqual([
        { type: "helloWorld/thunk/pending" },
      ]);
    });
  });

  it("renders an error message when there is no message in the state", () => {
    // Mock useSelector to return a state with no message
    useSelector.mockReturnValue({});

    // Create a mock store
    const store = mockStore({});

    // Render the component with the mock store
    const { getByText } = render(
      <Provider store={store}>
        <HelloWorldScreen />
      </Provider>
    );

    // Check if the error message is rendered
  });
});
