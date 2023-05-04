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
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password, role, fullName) => {
    const userRole = {
      name: fullName,
      email: email,
      role: role,
    };
    console.log(
      "🚀 ~ file: useFirebase.jsx:31 ~ createUser ~ userRole:",
      userRole
    );
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

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
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
