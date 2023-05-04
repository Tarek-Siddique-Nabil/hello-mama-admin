import React, { useContext, useState } from "react";
import { AuthContext } from "../../Hooks/useFirebase";

const Signup = () => {
  const { createUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  console.log("🚀 ~ file: Signup.jsx:9 ~ Signup ~ role:", role);
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createUser(email, password, role, fullName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} method="POST" className="mt-8">
            <select
              onChange={(e) => setRole(e.target.value)}
              className="select select-primary w-full max-w-xs"
            >
              <option disabled selected>
                Select Role
              </option>
              <option>Secondary Admin</option>
              <option>B2b</option>
              <option>Delivery Boy</option>
            </select>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900 dark:text-gray-200"
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    placeholder="Enter You Full Name"
                    id="name"
                  ></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900 dark:text-gray-200"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                  ></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900 dark:text-gray-200"
                >
                  {" "}
                  Password{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="password"
                    placeholder="Enter Your Password"
                    id="password"
                  ></input>
                </div>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
