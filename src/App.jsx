import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Component/DashBoard/Dashboard";
import ContextProvider from "./Hooks/useHooks";
import { Toaster } from "react-hot-toast";
import Navbar from "./Component/Header/Navbar";

import Order_Pages_Nabigation from "./Component/Order/Navigation/Order_Pages_Nabigation";
import Edit_Pages_Navigation from "./Component/EditPage/Navigation/Edit_Pages_Navigation";
import Offer_Navigation_Tab from "./Component/Offer/Navigation/Offer_Navigation_Tab";
import InputPagesNavigation from "./Component/InputPages/Navigation/InputPagesNavigation";
import FirebaseContextProvider from "./Hooks/useFirebase";
import Signup from "./Component/Account/Signup";

import Login from "./Component/Account/Login";

import Unauthorized from "./Component/Error/Unauthorized";
import B2b_Navigation from "./Component/B2b/Navigation/B2b_Navigation";
import RequireAuth from "./Hooks/RequireAuth";

const App = () => {
  return (
    <Router>
      <FirebaseContextProvider>
        <ContextProvider>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route
              path="/order"
              element={
                <RequireAuth>
                  <Order_Pages_Nabigation />
                </RequireAuth>
              }
            />
            <Route
              path="/input"
              element={
                <RequireAuth>
                  <InputPagesNavigation />
                </RequireAuth>
              }
            />
            <Route
              path="/edit"
              element={
                <RequireAuth>
                  <Edit_Pages_Navigation />
                </RequireAuth>
              }
            />
            <Route
              path="/offer"
              element={
                <RequireAuth>
                  <Offer_Navigation_Tab />
                </RequireAuth>
              }
            />
            <Route
              path="/signup"
              element={
                <RequireAuth>
                  <Signup />
                </RequireAuth>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/login" element={<Login />} />
          </Routes>
          <Toaster />
        </ContextProvider>
      </FirebaseContextProvider>
    </Router>
  );
};

export default App;
