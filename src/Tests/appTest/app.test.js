import React from "react";
import "@testing-library/jest-dom"; // MUST IMPORT THIS IN ALL TESTS
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";
import { MemoryRouter as Router } from 'react-router-dom';


jest.mock("../../screens/HelloWorldScreen", () => () => (
  <div>HelloWorldScreen Mock</div>
));
jest.mock("../../screens/registerUserScreen", () => () => (
  <div>RegisterUserScreen Mock</div>
));
jest.mock("../../screens/loginUserScreen", () => () => (
  <div>LoginScreen Mock</div>
));
jest.mock("../../components/home/Home", () => () => <div>HomeScreen Mock</div>);
jest.mock("../../components/details/Details", () => () => (
  <div>Details Mock</div>
));
jest.mock("../../components/WatchList/WatchList", () => () => (
  <div>WatchList Mock</div>
));
jest.mock("../../components/profile/profile", () => () => (
  <div>Profile Mock</div>
));

test("renders app", () => {
  render(
    <Router>
      <App />
    </Router>
  );
});

test("renders HelloWorldScreen for /helloworld route", () => {
  render(
    <Router initialEntries={["/helloworld"]}>
      <App />
    </Router>
  );
  expect(screen.getByText("HelloWorldScreen Mock")).toBeInTheDocument();
});

test("renders RegisterUserScreen for /account route", () => {
  render(
    <Router initialEntries={["/account"]}>
      <App />
    </Router>
  );
  expect(screen.getByText("RegisterUserScreen Mock")).toBeInTheDocument();
});

test("renders LoginScreen for /account/login route", () => {
  render(
    <Router initialEntries={["/account/login"]}>
      <App />
    </Router>
  );
  expect(screen.getByText("LoginScreen Mock")).toBeInTheDocument();
});

test("renders Home screen for / route", () => {
  render(
    <Router initialEntries={["/"]}>
      <App />
    </Router>
  );
  expect(screen.getByText("HomeScreen Mock")).toBeInTheDocument();
});

test("renders Details screen for /movie/:movieId (details) route", () => {
  render(
    <Router initialEntries={["/movie/:movieId"]}>
      <App />
    </Router>
  );
  expect(screen.getByText("Details Mock")).toBeInTheDocument();
});

test("renders WatchList screen for /Watchlist route", () => {
  render(
    <Router initialEntries={["/Watchlist"]}>
      <App />
    </Router>
  );
  expect(screen.getByText("WatchList Mock")).toBeInTheDocument();
});

test("renders Profile screen for /account/edit route", () => {
  render(
    <Router initialEntries={["/account/edit"]}>
      <App />
    </Router>
  );
  expect(screen.getByText("Profile Mock")).toBeInTheDocument();
});
