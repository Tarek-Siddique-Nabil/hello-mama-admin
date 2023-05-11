import React from "react";
import B2b_Navigation from "../Component/B2b/Navigation/B2b_Navigation";
import Login from "../Component/Account/Login";
import { Route, Router, Routes } from "react-router-dom";
import FirebaseContextProvider from "../Hooks/useFirebase";
import ContextProvider from "../Hooks/useHooks";

const B2b_Routes = () => {
  return (
    <Router>
      <FirebaseContextProvider>
        <ContextProvider>
          <Navbar />
          <Routes>
            <Route path="/b2b" element={<B2b_Navigation />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Toaster />
        </ContextProvider>
      </FirebaseContextProvider>
    </Router>
  );
};

export default B2b_Routes;
