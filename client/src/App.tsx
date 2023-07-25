import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages";
import "./style/index.scss";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
