import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterUserScreen from "./screens/registerUserScreen";
import LoginScreen from "./screens/loginUserScreen";
import HomeScreen from "../src/components/home/Home";
import Details from "./components/details/Details";
import Footer from "./components/footer/footer";

const App = () => {
  return (
    <Router>
      <main>
        <Container>
          <Routes>
            <Route path="/helloworld" element={<HelloWorldScreen />} />
            <Route path="/account" element={<RegisterUserScreen />} />
            <Route path="/account/login" element={<LoginScreen />} />
            <Route path="/movie/:movieId" element={<Details />}/>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
        <Footer />

      </main>
    </Router>
  );
};

export default App;
