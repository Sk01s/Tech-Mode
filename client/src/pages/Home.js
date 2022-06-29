import React from "react";
import Hero from "../components/Hero";
import DisplayCategories from "../components/DisplayCategories";
import Promises from "../components/Promises";
import DisplayProducts from "../components/DisplayProducts";
import { useCategories } from "../context/CategoiresContext";
import LoadingAnimtion from "../components/LoadingAnimtion";
export default function Home() {
  const categories = useCategories();
  if (categories[0] === undefined) return <LoadingAnimtion />;
  const getCardCategories = () => {
    return categories.map(({ id, picture, description, offer }) => {
      return (
        <DisplayCategories
          picture={picture}
          description={description}
          offer={offer}
          key={id}
          id={id}
        />
      );
    });
  };
  return (
    <div className="container">
      <Hero />
      <div className="offers grid ">{getCardCategories()}</div>
      <Promises />
      <DisplayProducts
        title="best sellers"
        products={categories.map((category) => [
          category.projects,
          category.id,
        ])}
      />
    </div>
  );
}
