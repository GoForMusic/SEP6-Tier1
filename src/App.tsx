import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterUserScreen from "./screens/registerUserScreen";
import FilterComponent from "./components/filterComponent";

const App = () => {
  return (
    <Router>
      <main>
        <Container>
          <Routes>
            <Route path="/helloworld" element={<HelloWorldScreen />} />
            <Route path="/account" element={<RegisterUserScreen />} />
            <Route path="/filter" element={<FilterComponent/>} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
};

export default App;
