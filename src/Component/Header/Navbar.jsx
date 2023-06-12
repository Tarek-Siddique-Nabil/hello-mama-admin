import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../Hooks/useFirebase";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navbarRef = useRef(null); // Reference to the navbar component

  const storeUser = localStorage.getItem("User email");
  const navigationPath = ["dashboard", "input", "order", "edit", "offer"];

  const [isFloating, setIsFloating] = useState(false);
  const [selection, setSelection] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsFloating(true);
    } else {
      setIsFloating(false);
    }
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Framer Motion

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    open: { width: "200px", opacity: 1 },
    closed: { width: "0px", opacity: 0 },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      x: -50,
      opacity: 0,
      transition: {
        x: { stiffness: 1000 },
      },
    },
  };

  return (
    <>
      {!user && (
        <div
          ref={navbarRef}
          className={isFloating ? "fixed w-full bg-white z-50" : ""}
        >
          <section className="">
            <div className="fixed top-0 bottom-0 left-0" onClick={handleToggle}>
              <motion.div
                className="fixed top-0 bottom-0 left-0"
                variants={overlayVariants}
                animate={isOpen ? "open" : "closed"}
              ></motion.div>
            </div>

            <motion.div
              className="top-0 bottom-0 left-0 bg-gray-200 fixed z-50"
              variants={menuVariants}
              animate={isOpen ? "open" : "closed"}
              initial="closed"
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={handleToggle}
                className="absolute right-3 top-3  border border-black rounded-lg p-1 focus:bg-cyan-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
              </button>
              <motion.ul className="flex flex-col justify-center items-center mt-20 gap-3">
                {navigationPath.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={variants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-lg font-semibold hover:font-bold mt-3 "
                  >
                    <NavLink
                      to={`/${item}`}
                      className={
                        selection === index
                          ? "border border-black px-3 py-1.5 rounded-xl bg-cyan-400 focus:bg-cyan-400 shadow-lg focus:shadow-gray-500 "
                          : "border border-black px-3 py-1.5 rounded-xl bg-gray-400 focus:bg-cyan-400 shadow-lg focus:shadow-gray-500 "
                      }
                      onClick={() => setSelection(index)}
                    >
                      <span className="capitalize">{item}</span>
                    </NavLink>
                  </motion.li>
                ))}

                <div>
                  <div
                    className="flex hover:cursor-pointer border border-black px-3 py-1.5 rounded-xl bg-gray-400 focus:bg-cyan-400 shadow-lg focus:shadow-gray-500 transition-all duration-300 delay-75 ease-in-out"
                    onClick={() => setIsExpand(!isExpand)}
                  >
                    <p>Authentication</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 transition-all duration-300 delay-75 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={
                          isExpand === true
                            ? "M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                            : "M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                        }
                      />
                    </svg>
                  </div>
                  {isExpand === true && (
                    <div className="flex flex-col gap-2 mt-2 transition-all duration-150 ease-in-out delay-75">
                      <NavLink
                        to="/signup"
                        className={
                          selection === "signup"
                            ? "border border-black px-3 py-1.5 rounded-xl bg-cyan-400 focus:bg-cyan-400 shadow-lg focus:shadow-gray-500 transition-all duration-300 delay-75 ease-in-out"
                            : "border border-black px-3 py-1.5 rounded-xl bg-gray-400 focus:bg-cyan-400 shadow-lg focus:shadow-gray-500 transition-all duration-300 delay-75 ease-in-out"
                        }
                        onClick={() => setSelection("signup")}
                      >
                        Create Account
                      </NavLink>
                      <NavLink
                        to={"/allAccount"}
                        className={
                          selection === "user"
                            ? "border border-black px-3 py-1.5 rounded-xl bg-cyan-400 focus:bg-cyan-400 shadow-lg focus:shadow-gray-500 transition-all duration-300 delay-75 ease-in-out"
                            : "border border-black px-3 py-1.5 rounded-xl bg-gray-400 focus:bg-cyan-400 shadow-lg focus:shadow-gray-500 transition-all duration-300 delay-75 ease-in-out"
                        }
                        onClick={() => setSelection("user")}
                      >
                        Existing Account
                      </NavLink>
                    </div>
                  )}
                </div>
              </motion.ul>
            </motion.div>
            <div className="flex justify-between items-center mx-3">
              <button onClick={handleToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>{" "}
              <div className="flex items-center group my-2">
                <input className="border-2  border-red-600 h-9 rounded-l-lg px-1" />
                <button className="bg-[#FB2E86] rounded-r-lg w-8 group-hover:bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-9 text-white  rounded-r-md"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-row gap-5">
                <button className="group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-[#FB2E86]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost m-1">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 group-hover:text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content bg-slate-100 menu p-2 shadow rounded-box w-60 border border-black gap-3"
                  >
                    <li>
                      <button className="capitalize font-bold ">
                        {storeUser}
                      </button>
                    </li>
                    <li>
                      <button
                        className="border bg-red-500 border-red-500 shadow-md hover:shadow-lg transition-all duration-150 ease-in-out shadow-slate-50"
                        onClick={() => {
                          logOut(), toast.success("Log Out Successful");

                          localStorage.removeItem("User email");
                        }}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Navbar;
