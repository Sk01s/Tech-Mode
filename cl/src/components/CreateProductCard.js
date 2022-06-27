import React from "react";
import { Link } from "react-router-dom";

export default function CreateProductCard({ productArr }) {
  if (productArr[0] === undefined) return <></>;
  if (!Array.isArray(productArr[0]))
    return (
      <Link
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        to={`/Tech-Mode/product/${productArr[1]}-${productArr[0].id}`}
        className="product-card flex flex-direc"
      >
        <div className="img-box">
          <img src={productArr[0].photos} alt="" />
        </div>
        <div className="details">
          <h3>{productArr[0].title}</h3>
        </div>
        <p className="price">{productArr[0].price} $</p>
      </Link>
    );
  return productArr[0].map((product, index) => {
    return (
      <Link
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        to={`/Tech-Mode/product/${productArr[1]}-${product.id}`}
        className="product-card flex flex-direc"
        key={index + 1}
      >
        <div className="img-box">
          <img src={product.photos} alt="" />
        </div>
        <div className="details">
          <h3>{product.title}</h3>
        </div>
        <p className="price">{product.price} $</p>
      </Link>
    );
  });
}
