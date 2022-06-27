import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const categoriesContext = React.createContext();

export function useCategories() {
  return useContext(categoriesContext);
}
export function CategoiresContext({ children }) {
  const history = useNavigate();
  const [categories, setGategories] = useState(() => []);
  const categoriesCol = collection(db, "categories");
  useEffect(() => {
    const getCategories = async () => {
      const categoriesSnapshot = await getDocs(categoriesCol);
      if (categoriesSnapshot.empty === true) history("/403");
      setGategories(
        categoriesSnapshot?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getCategories(db);
  }, []);
  return (
    <categoriesContext.Provider value={categories}>
      {children}
    </categoriesContext.Provider>
  );
}
