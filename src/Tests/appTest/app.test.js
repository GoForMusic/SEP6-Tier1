import React from 'react';
import '@testing-library/jest-dom' // MUST IMPORT THIS IN ALL TESTS
import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App'

jest.mock('../../screens/HelloWorldScreen', () => () => <div>HelloWorldScreen Mock</div>);
jest.mock('../../screens/registerUserScreen', () => () => <div>RegisterUserScreen Mock</div>);
jest.mock('../../screens/loginUserScreen', () => () => <div>LoginScreen Mock</div>);
jest.mock('../../components/home/Home', () => () => <div>HomeScreen Mock</div>);
jest.mock('../../components/details/Details', () => () => <div>Details Mock</div>);

test('renders app', () => {
    render(<App router={BrowserRouter} />);
});


test('renders HelloWorldScreen for /helloworld route', () => {

  window.history.pushState({}, 'Hello world page', '/helloworld');
  render(<App router={BrowserRouter} />);
  expect(screen.getByText('HelloWorldScreen Mock')).toBeInTheDocument();

  });

test('renders RegisterUserScreen for /account route', () => {

  window.history.pushState({}, 'Test page', '/account');
  render(<App router={BrowserRouter} />);
  expect(screen.getByText('RegisterUserScreen Mock')).toBeInTheDocument();
  
});

test('renders LoginScreen for /account/login route', () => {

  window.history.pushState({}, 'Login page', '/account/login');
  render(<App router={BrowserRouter} />);
  expect(screen.getByText('LoginScreen Mock')).toBeInTheDocument();

});

test('renders Home screen for / route', () => {

  window.history.pushState({}, 'Home page', '/');
  render(<App router={BrowserRouter} />);
  expect(screen.getByText('HomeScreen Mock')).toBeInTheDocument();

});
  
test('renders Details screen for /movie/:movieId (details) route', () => {

  window.history.pushState({}, 'Movie details page', '/movie/:movieId');
  render(<App router={BrowserRouter} />);
  expect(screen.getByText('Details Mock')).toBeInTheDocument();

});
