import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Body from "../Component/Body/Body";
import Sidebar from "../Component/Header/Sidebar";
import Dashboard from "../Component/Pages/Dashboard";
import ContextProvider from "./Hooks/useHooks";

const App = () => {
  return (
    <Router>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Sidebar />} />
        </Routes>
      </ContextProvider>
    </Router>
  );
};

export default App;
