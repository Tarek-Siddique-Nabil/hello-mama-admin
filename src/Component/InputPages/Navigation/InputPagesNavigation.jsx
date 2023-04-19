import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Product_Input from "../Pages/Product_Input";
import Category_Input from "../Pages/Category_Input";
import Unit from "../Pages/Unit";
import { CustomHookContext } from "../../../Hooks/useHooks";

const InputPagesNavigation = () => {
  const tabs = [
    {
      icon: "📦",
      label: "Product",
      scene: <Product_Input />,
    },
    {
      icon: "🗒️",
      label: "Category",
      scene: <Category_Input />,
    },
    { icon: "⚡", label: "Unit", scene: <Unit /> },
  ];
  const [selectedTab, setSelectedTab] = useState({
    label: "Product",
    scene: <Product_Input />,
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
        <p className="text-lg font-semibold text-center mb-3">Input Pages</p>
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

export default InputPagesNavigation;
