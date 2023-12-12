import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CommentForm from "./CommentForm";
import { fetchComments, addComment } from "../thunks/commentsThunk";

const mockStore = configureStore([]);

describe("CommentForm Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: true, // You can modify this based on your needs
        user: { userId: "123" }, // Mock user data
      },
      commentReducer: {
        comments: [
          // Mock comments data
          { id: "1", text: "Comment 1", createdAt: "2023-01-01T12:00:00Z" },
          { id: "2", text: "Comment 2", createdAt: "2023-01-02T12:00:00Z" },
        ],
      },
    });

    store.dispatch = jest.fn(); // Mock dispatch function
  });

  test("renders CommentForm component", () => {
    render(
      <Provider store={store}>
        <CommentForm movieId="123" />
      </Provider>
    );

    expect(screen.getByText("Existing Comments")).toBeInTheDocument();
    expect(screen.getByText("Comment 1")).toBeInTheDocument();
    expect(screen.getByText("Comment 2")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type your comment...")
    ).toBeInTheDocument();
  });

  test("handles adding a new comment", () => {
    render(
      <Provider store={store}>
        <CommentForm movieId="123" />
      </Provider>
    );

    // Type a new comment
    fireEvent.change(screen.getByPlaceholderText("Type your comment..."), {
      target: { value: "New Comment" },
    });

    // Click the "Add Comment" button
    fireEvent.click(screen.getByText("Add Comment"));

    // Ensure that dispatch was called with the correct action
    expect(store.dispatch).toHaveBeenCalledWith(
      addComment({ text: "New Comment", movieId: "123", userId: "123" })
    );
  });

  test("fetches comments on mount", () => {
    render(
      <Provider store={store}>
        <CommentForm movieId="123" />
      </Provider>
    );

    // Ensure that fetchComments action was called on mount
    expect(store.dispatch).toHaveBeenCalledWith(fetchComments("123"));
  });
});
