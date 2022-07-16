import React, { useRef, useState } from "react";
import { useAuth } from "../context/authenticator";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
  const [error, setError] = useState("");
  const email = useRef();
  const password = useRef();
  const { login } = useAuth();
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailV = email.current.value;
    const passwordV = password.current.value;

    setError("");
    login(emailV, passwordV)
      .then((message) => {
        if (typeof message === "string")
          return setError(
            message
              .match(/\/[\s\S]*/)[0]
              .slice(1, -2)
              .replaceAll("-", " ")
          );
        history("/tech-mode");
      })
      .catch((message) =>
        setError(
          message
            .match(/\/[\s\S]*/)[0]
            .slice(1, -2)
            .replaceAll("-", " ")
        )
      );
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="container flex algin-ce justify-ce flex-direc signup-container"
    >
      <h2 className="text-ce">Login</h2>
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
      <button className="btn-submit">log in</button>
      <h3 className="switch-sign-way-text flex gap-1 justify-ce p-3">
        You do not have an account
        <Link to="/Tech-Mode/signup">sign up</Link>
      </h3>
    </form>
  );
}
