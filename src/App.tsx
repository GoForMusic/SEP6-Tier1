import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import RegisterUserScreen from "./screens/registerUserScreen";
import LoginScreen from "./screens/loginUserScreen";
import HomeScreen from "../src/components/home/Home";
import Details from "./components/details/Details";
import { Route, Routes } from "react-router";
import Footer from "./components/footer/footer";
import ResponsiveAppBar from "./components/navbar";

const App = ({ router: RouterComponent }) => {
  return (
    <>
      <RouterComponent>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/helloworld" element={<HelloWorldScreen />} />
          <Route path="/account" element={<RegisterUserScreen />} />
          <Route path="/account/login" element={<LoginScreen />} />
          <Route path="/movie/:movieId" element={<Details />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </RouterComponent>
      <Footer />
    </>
  );
};

export default App;
