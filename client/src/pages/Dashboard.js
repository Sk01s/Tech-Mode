import React from "react";
import { useAuth } from "../context/authenticator";
import { useNavigate } from "react-router-dom";
import LoadingAnimtion from "../components/LoadingAnimtion";
export default function Dashboard() {
  const { currentUser, signout } = useAuth();
  const history = useNavigate();
  const handleSignOut = () => {
    signout();
    history("/Tech-Mode");
  };
  if (currentUser == undefined) return <LoadingAnimtion />;
  return (
    <article className="dashboard container">
      <h1>Your Account</h1>
      <p>Email : {currentUser.email}</p>
      <button onClick={handleSignOut}>sign out </button>
    </article>
  );
}
