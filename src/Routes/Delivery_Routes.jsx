import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import FirebaseContextProvider from "../Hooks/useFirebase";
import ContextProvider from "../Hooks/useHooks";
import Navbar from "../Component/Header/Navbar";
import Sms from "../Component/Delivery/Sms";
import Login from "../Component/Account/Login";

const Delivery_Routes = () => {
  return (
    <Router>
      <FirebaseContextProvider>
        <ContextProvider>
          <Navbar />
          <Routes>
            <Route path="/sms" element={<Sms />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Toaster />
        </ContextProvider>
      </FirebaseContextProvider>
    </Router>
  );
};

export default Delivery_Routes;
