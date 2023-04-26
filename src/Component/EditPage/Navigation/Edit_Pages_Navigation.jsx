import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DetailsEdit from "../Pages/DetailsEdit";
import TableEdit from "../Pages/TableEdit";

const Edit_Pages_Navigation = () => {
  const tabs = [
    {
      icon: "📃",
      label: "Table",
      scene: <TableEdit />,
    },
    {
      icon: "📝",
      label: "Single",
      scene: <DetailsEdit />,
    },
  ];
  const [selectedTab, setSelectedTab] = useState({
    icon: "📃",
    label: "Table",
    scene: <TableEdit />,
  });
  return (
    <>
      <style>
        {`
      .underline-animation {
        position: relative;
        transition: all 0.3s ease-in-out;
      }

      .underline-animation::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -0.2rem;
        width: 100%;
        height: 0.2rem;
        background-color: #ed3779;
        transform: scaleX(1);
        transform-origin: bottom left;
        transition: transform 0.3s ease-in-out;
      }

      .underline-animation:hover::after,
      .underline-animation:focus::after,
      .underline-animation:active::after,
      .underline-animation:focus-visible::after {
        transform: scaleX(0);
      }
    `}
      </style>
      <div className="container lg:px-16 py-5 mx-auto border">
        <p className="text-lg font-semibold text-center mb-3">Order Pages</p>
        <nav>
          <div className="flex justify-center gap-5">
            {tabs.map((item, index) => (
              <button
                className={
                  item.label === selectedTab.label
                    ? "border-2 px-3 py-1 rounded-xl bg-green-300 transition-all duration-300 ease-out"
                    : "border-2 px-3 py-1 rounded-xl transition-all duration-300 ease-out"
                }
                key={index}
                onClick={() => setSelectedTab(item)}
              >
                {item.icon}
                <span
                  className={
                    index === selectedTab
                      ? "underline-animation"
                      : "no-underline"
                  }
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <hr className="bg-gray-700 rounded w-1/2 h-1 mt-3 mx-auto" />
        </nav>
        <main>
          <AnimatePresence>
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            ></motion.div>
            {selectedTab?.scene}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};

export default Edit_Pages_Navigation;
