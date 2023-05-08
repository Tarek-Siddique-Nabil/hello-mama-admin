import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { toast } from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);

const FirebaseContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  console.log(
    "🚀 ~ file: useFirebase.jsx:22 ~ FirebaseContextProvider ~ userRole:",
    userRole
  );
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password, role, fullName, nid) => {
    const userRole = {
      name: fullName,
      email: email,
      role: role,
      nid: nid,
    };
    try {
      const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/role`;
      const response = await axios.post(url, userRole, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = response.data;

      if (json) {
        toast.success("user created successfully", {
          position: "top-center",
        });
        return createUserWithEmailAndPassword(auth, email, password);
      }
      console.log(json);
    } catch (err) {
      toast.error(`${err?.message}`, {
        position: "top-center",
      });
    }
  };

  const signIn = async (email, password) => {
    try {
      const url = `${
        import.meta.env.VITE_APP_SECRET_SERVER_SIDE
      }/role/${email}`;
      setLoading(false);
      const response = await axios.get(url);
      const json = response.data;
      if (json) {
        console.log("🚀 ~ file: useFirebase.jsx:66 ~ fetchData ~ json:", json);
        toast.success("Login Successfully", {
          duration: 1500,
          position: "top-center",
        });
        localStorage.setItem("User email", json.email);
        localStorage.setItem("User role", json.role);
        signInWithEmailAndPassword(auth, email, password);
        setUserRole({ email: json.email, role: json.role });
      } else {
        toast.error("User Not Found in DataBase", {
          position: "top-center",
          duration: 1500,
        });
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  // why are we doing this?
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, loading, createUser, signIn, logOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default FirebaseContextProvider;
