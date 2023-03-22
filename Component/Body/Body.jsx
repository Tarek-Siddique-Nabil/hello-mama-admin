import React from "react";
import Sidebar from "../Header/Sidebar";
import Dashboard from "../Pages/Dashboard";

const Body = () => {
  return (
    <div>
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4">
        <Dashboard />
      </div>
    </div>
  );
};

export default Body;
