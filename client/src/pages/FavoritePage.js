import React, { useEffect, useState } from "react";
import { useCategories } from "../context/CategoiresContext";
import { db } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/authenticator";
import DisplayProducts from "../components/DisplayProducts";
import LoadingAnimtion from "../components/LoadingAnimtion";
import { useNavigate } from "react-router-dom";

export default function FavoritePage() {
  const history = useNavigate();
  const [favoProduct, setFavoriteProduct] = useState();
  const { currentUser } = useAuth();
  const categories = useCategories();
  if (!currentUser) history("/Tech-Mode/login");
  useEffect(() => {
    const FavoriteList = async () => {
      if (currentUser === null) return setFavoriteProduct(null);
      const direc = await getDoc(doc(db, "Favorite", currentUser?.uid));
      setFavoriteProduct(
        direc.data().list.map((direc) => {
          const [categoryId, productId] = direc.split("-");

          return [
            categories
              .find((category) => {
                if (category.id === categoryId) return true;
                return false;
              })
              ?.projects.find((product) =>
                product.id == productId ? true : false
              ),
            categoryId,
          ];
        })
      );
    };
    FavoriteList();
  }, [categories, currentUser]);
  if (!favoProduct) return <LoadingAnimtion />;
  return (
    <div className="container">
      <DisplayProducts title="Favorites" products={favoProduct} />
    </div>
  );
}
