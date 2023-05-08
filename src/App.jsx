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
import Sms from "./Component/Delivery/Sms";
import Login from "./Component/Account/Login";
import B2b_Navigation from "./Component/B2b/Navigation/B2b_Navigation";

const App = () => {
  return (
    <Router>
      <FirebaseContextProvider>
        <ContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/order" element={<Order_Pages_Nabigation />} />
            <Route path="/input" element={<InputPagesNavigation />} />
            <Route path="/edit" element={<Edit_Pages_Navigation />} />
            <Route path="/offer" element={<Offer_Navigation_Tab />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/b2b" element={<B2b_Navigation />} />
            <Route path="/sms" element={<Sms />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Toaster />
        </ContextProvider>
      </FirebaseContextProvider>
    </Router>
  );
};

export default App;
