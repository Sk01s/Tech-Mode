import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const { auth } = require("../firebase-config");

const AuthContext = React.createContext();

function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password).catch(
    (error) => error.message
  );
}

function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password).catch(
    (error) => error.message
  );
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
