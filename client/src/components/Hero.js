import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="details">
        <h1>Incredible Prices on All Your Favorite Items</h1>
        <p>Get more for less on selected brands</p>
        <Link
          to="/Tech-Mode/categories"
          style={{
            textDecoration: "none",
          }}
          className="pointer"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
