/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import axios from "axios";
import app from "../Firebase/firebase.config";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const auth = getAuth(app);

const FirebaseContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email, password) => {
    try {
      const url = `${
        import.meta.env.VITE_APP_SECRET_SERVER_SIDE
      }/role/${email}`;
      setLoading(true);
      const response = await axios.get(url);
      const json = response.data;
      if (json) {
        if (json?.role === "Admin") {
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential?.user;

              setUser(user);
              navigate("/");
              if (user) {
                toast.success("Login Successfully", {
                  duration: 1500,
                  position: "top-center",
                });
                localStorage.setItem("User email", user?.email);
              }
            })
            .catch((error) => {
              const errorCode = error.code;
              return toast.error(`${errorCode}`, {
                position: "top-center",
                duration: 1500,
              });
            });
        } else {
          return toast.error("You Try to  unauthorized login", {
            position: "top-center",
            duration: 1500,
          });
        }
      }
      if (!json?.role) {
        toast.error("User Not Found in DataBase", {
          position: "top-center",
          duration: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default FirebaseContextProvider;
