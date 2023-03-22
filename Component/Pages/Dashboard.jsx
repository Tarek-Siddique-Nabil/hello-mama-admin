import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div className="stats stats-vertical lg:stats-horizontal shadow md:flex md:justify-center items-center]">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <lord-icon
              className="inline-block"
              src="https://cdn.lordicon.com/iejknaed.json"
              trigger="hoverF"
              style={{ width: "80px", height: "80px" }}
            ></lord-icon>
          </div>
          <div className="font-extrabold text-lg underline underline-offset-1">
            Shipping Order
          </div>
          <div className="flex  justify-between items-center">
            <div className="stat-value">67</div>
            <div className="font-semibold text-lg">$5800</div>
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <lord-icon
              className="inline-block"
              src="https://cdn.lordicon.com/cllunfud.json"
              trigger="hover"
              style={{ width: "80px", height: "80px" }}
            ></lord-icon>
          </div>
          <div className="font-extrabold text-lg underline underline-offset-1">
            Pending Order
          </div>
          <div className="flex  justify-between items-center">
            <div className="stat-value">90</div>
            <div className="font-semibold text-lg">$58800</div>
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <lord-icon
              className="inline-block"
              src="https://cdn.lordicon.com/qzwudxpy.json"
              trigger="hover"
              style={{ width: "80px", height: "80px" }}
            ></lord-icon>
          </div>
          <div className="font-extrabold text-lg underline underline-offset-1">
            New Order
          </div>
          <div className="flex  justify-between items-center">
            <div className="stat-value">35</div>
            <div className="font-semibold text-lg">$5800</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
