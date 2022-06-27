import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

const AuthContext = React.createContext();

function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function useAuth() {
  return useContext(AuthContext);
}
export function Authenticator({ children }) {
  function signout() {
    signOut(auth);
    setCurrentUser(null);
  }
  useEffect(() => {
    const unsubercibe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      return unsubercibe;
    });
  });
  const [currentUser, setCurrentUser] = useState();
  const value = {
    signout,
    login,
    signup,
    currentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
