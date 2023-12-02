import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterUserScreen from "./screens/registerUserScreen";
import FilterYearComponent from "./components/filterYearComponent";
import LoginScreen from "./screens/loginUserScreen";

const App = () => {
  return (
    <Router>
      <main>
        <Container>
          <Routes>
            <Route path="/helloworld" element={<HelloWorldScreen />} />
            <Route path="/account" element={<RegisterUserScreen />} />
            <Route path="/filter" element={<FilterYearComponent/>} />
            <Route path="/login" element={<LoginScreen/>}/>
          </Routes>
        </Container>
      </main>
    </Router>
  );
};

export default App;
