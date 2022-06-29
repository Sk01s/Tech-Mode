import React, { useRef, useState } from "react";
import { useAuth } from "../context/authenticator";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFavorite } from "../context/setOutFucntions";
export default function Signup() {
  const { createFavList, createCart } = useFavorite();
  const [error, setError] = useState("");
  const email = useRef();
  const password = useRef();
  const passwordConfrimation = useRef();
  const { signup } = useAuth();

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailV = email.current.value;
    const passwordV = password.current.value;
    const passwordConfrimationV = passwordConfrimation.current.value;

    if (passwordV !== passwordConfrimationV) {
      return setError("Passwords do not match");
    }

    setError("");
    try {
      const respons = await signup(emailV, passwordV);
      console.log(respons);
      createCart(respons.user);
      createFavList(respons.user);
      history("/Tech-Mode");
    } catch {
      setError("");
    }

    // setError("An error happend during signup");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="container flex algin-ce justify-ce flex-direc signup-container"
    >
      <h2 className="text-ce">Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <label htmlFor="email">email</label>
      <input
        ref={email}
        type="text"
        placeholder="your email"
        id="email"
        name="email"
        required
      />
      <label htmlFor="password">password</label>
      <input
        type="text"
        placeholder="your password"
        id="password"
        name="password"
        ref={password}
        required
      />
      <label htmlFor="passPword-confirmation">confirm password </label>
      <input
        type="text"
        placeholder="confirm your password"
        id="password-confirmation"
        ref={passwordConfrimation}
        required
      />
      <button className="btn-submit">Create account</button>
      <h3 className="switch-sign-way-text flex gap-2 justify-ce p-3">
        You have an account
        <Link to="/Tech-Mode/login">Log In</Link>
      </h3>
    </form>
  );
}
