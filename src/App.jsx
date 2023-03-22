import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Body from "../Component/Body/Body";
import Sidebar from "../Component/Header/Sidebar";
import Dashboard from "../Component/Pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />} />
      </Routes>
    </Router>
  );
};

export default App;
