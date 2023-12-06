import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterUserScreen from "./screens/registerUserScreen";
import FilterYearComponent from "./components/filterYearComponent";
import LoginScreen from "./screens/loginUserScreen";
import FilterByRateComponent from "./components/filterByRateComponent";
import Home from "./components/home/Home";

const App = () => {
  return (
    <Router>
      <main>
        <Container>
          <Routes>
            <Route path="/helloworld" element={<HelloWorldScreen />} />
            <Route path="/movies" element={<Home />} />
            <Route path="/account" element={<RegisterUserScreen />} />
            <Route path="/filter" element={<FilterYearComponent />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/rate" element={<FilterByRateComponent />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
};

export default App;
