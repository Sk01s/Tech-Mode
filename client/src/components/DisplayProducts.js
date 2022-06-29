import React from "react";
import CreateCardProduct from "./CreateProductCard";
export default function DisplayProducts({ title, products }) {
  let number = 1;
  const productsCards = products?.map((productArr) => {
    if (productArr[0] === undefined) return <div key={number++}></div>;
    return (
      <CreateCardProduct
        productArr={productArr}
        key={`${productArr[1]}${number++}`}
      />
    );
  });

  return (
    <div className="products-section">
      <h2 className="title">{title}</h2>
      <div className="products-container grid justify-ce">{productsCards}</div>
    </div>
  );
}
