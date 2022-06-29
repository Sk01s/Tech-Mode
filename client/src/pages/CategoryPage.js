import React from "react";
import { useParams } from "react-router-dom";
import { useCategories } from "../context/CategoiresContext";
import DisplayProducts from "../components/DisplayProducts";

export default function CategoriesPage() {
  const categories = useCategories();

  const { categoryId, searchProduct } = useParams();

  if (categories.length === 0) return;

  let productsData;
  const getTitle = () => {
    return categoryId === undefined
      ? "best seller"
      : categories.find((category) =>
          category.id === categoryId ? true : false
        )?.name;
  };

  if (searchProduct !== undefined) {
    const [, value] = searchProduct.split("=");
    productsData = categories.map((category) => {
      return [category.projects, category.id];
    });

    for (let i = 0; i < productsData.length; i++) {
      const category = productsData[i][0];

      if (category === undefined) continue;
      productsData[i][0] = category.filter(({ title }) => {
        if (title.toLowerCase().includes(value.toLowerCase())) return true;
        return false;
      });
    }
  }
  return (
    <div className="category-page container">
      {categoryId !== undefined ? (
        <DisplayProducts
          title={getTitle()}
          products={categories.map((category) => {
            if (categoryId === undefined)
              return [category?.projects, category.id];
            if (category.id === categoryId)
              return [category?.projects, category.id];
            return [undefined, category.id];
          })}
        />
      ) : (
        <DisplayProducts title="Search" products={productsData} />
      )}
    </div>
  );
}
