import React from "react";
import { Link } from "react-router-dom";
export default function DisplayCategories({ picture, description, offer, id }) {
  const styles = {
    backgroundImage: `url(${picture})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  return (
    <article className="offer-card" style={styles}>
      <div className="details">
        <h2>{offer}</h2>
        <p>{description}</p>
        <Link
          to={`/Tech-Mode/categories/${id}`}
          style={{
            textDecoration: "none",
          }}
        >
          shop
        </Link>
      </div>
    </article>
  );
}
