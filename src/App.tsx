import React from "react";
import "./App.css";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import RegisterUserScreen from "./screens/registerUserScreen";
import LoginScreen from "./screens/loginUserScreen";
import HomeScreen from "../src/components/home/Home";
import Details from "./components/details/Details";
import { Route, Routes } from "react-router";
import Footer from "./components/footer/footer";
import Profile from "./components/profile/profile";
import WatchList from "./components/WatchList/WatchList";

const App = () => {
  return (
    <div className="main-container">
        <div className="content">
          <Routes>
            <Route path="/helloworld" element={<HelloWorldScreen />} />
            <Route path="/account" element={<RegisterUserScreen />} />
            <Route path="/account/login" element={<LoginScreen />} />
            <Route path="/movie/:movieId" element={<Details />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/account/edit" element={<Profile />} />
          </Routes>
        </div>
      <Footer />
    </div>
  );
};

export default App;
