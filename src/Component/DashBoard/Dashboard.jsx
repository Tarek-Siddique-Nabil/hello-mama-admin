import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div className="flex  md:flex-row flex-col stats stats-vertical lg:stats-horizontal shadow   items-center mx-auto">
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
      <div className="flex flex-col md:flex-row lg:justify-between justify-center items-center">
        <div>
          <p className="dark:text-slate-50 text-xl font-bold text-center underline ">
            Inbox
          </p>
          <div className="alert shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h3 className="font-bold">New message!</h3>
                <div className="text-xs">You have 1 unread message</div>
              </div>
            </div>
            <div className="flex-none">
              <button className="btn btn-sm">See</button>
            </div>
          </div>
        </div>
        <div className=" ">
          <p className="dark:text-slate-50 text-xl font-bold text-center underline">
            B2B User
          </p>
          <div className="alert shadow-lg">
            <div>
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="font-bold">Sunny Leone</h3>
                <div className="text-md">
                  <span className="font-bold">Email:</span> Email:dddd@
                  gmail.com
                </div>
                <div className="text-md ">
                  <span className="font-bold">Number:</span> dddd@ gmail.com
                </div>
              </div>
            </div>
            <div className="flex-none">
              <button className="btn btn-sm">See</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
