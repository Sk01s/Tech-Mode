import React from "react";
import { Routes, Route } from "react-router-dom";
import "./css/reset.css";
import "./css/styles.css";
import { CategoiresContext } from "./context/CategoiresContext";
import { Favorite } from "./context/setOutFucntions";
import { Authenticator } from "./context/authenticator";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import CategoriesPage from "./pages/CategoryPage";
import SetOutProduct from "./pages/SetOutProduct";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FavoritePage from "./pages/FavoritePage";
import CartPage from "./pages/CartPage";
import Error from "./pages/ErrorPage";
export default function App() {
  return (
    <CategoiresContext>
      <Authenticator>
        <Favorite>
          <Nav />
          <Routes>
            <Route path="/403" element={<Error />} />
            <Route path="" exact element={<Home />} />
            <Route path="/Tech-Mode" element={<Home />} />
            <Route path="/Tech-Mode/product" element={<SetOutProduct />}>
              <Route path=":productDirec" element={<SetOutProduct />} />
            </Route>
            <Route path="/Tech-Mode/search" element={<CategoriesPage />}>
              <Route path=":searchProduct" element={<CategoriesPage />} />
            </Route>
            <Route path="/Tech-Mode/favorite" element={<FavoritePage />} />
            <Route path="/Tech-Mode/signup" element={<Signup />} />
            <Route path="/Tech-Mode/login" element={<Login />} />
            <Route path="/Tech-Mode/dashboard" element={<Dashboard />} />
            <Route path="/Tech-Mode/categories" element={<CategoriesPage />}>
              <Route path=":categoryId" element={<CategoriesPage />} />
            </Route>
            <Route path="/Tech-Mode/cart" element={<CartPage />} />
          </Routes>
        </Favorite>
      </Authenticator>
    </CategoiresContext>
  );
}
