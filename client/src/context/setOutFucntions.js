import React, { useContext, useState } from "react";
import { db } from "../firebase-config";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./authenticator";
import { useNavigate } from "react-router-dom";
const FavoriteContext = React.createContext();

export function useFavorite() {
  return useContext(FavoriteContext);
}
export function Favorite({ children }) {
  const [favProducts, setFavProducts] = useState();
  const [cartProducts, setCartProducts] = useState();
  const history = useNavigate();
  const { currentUser } = useAuth();
  async function getList(collection) {
    const docs = await getDoc(doc(db, collection, currentUser?.uid));
    let docData = docs.data();

    return docData;
  }
  async function checkout(order) {
    fetch("/payment/create-checkout-session", {
      body: JSON.stringify({
        items: order,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => console.log(e.error));
  }
  async function setQuanitiyDb(number = Number, directory) {
    let { list } = await getList("cart");
    list = list.map((product) => {
      if (product?.directory === directory)
        return { ...product, quantity: number };
      return product;
    });
    setCartProducts({ list });
    await setDoc(
      doc(db, "cart", currentUser.uid),
      {
        list,
      },
      {
        merge: true,
      }
    );
  }
  async function removeCartProduct(productDirectory) {
    let { list } = await getList("cart");
    list = list.filter((product) => {
      if (product.directory === productDirectory) return false;
      return true;
    });
    setCartProducts({ list });
    await updateDoc(doc(db, "cart", currentUser.uid), {
      list,
    });
  }
  async function createCart(user) {
    setCartProducts({ list: [] });
    await setDoc(
      doc(db, "cart", user.uid),
      {
        list: [],
      },
      { merge: true }
    );
  }
  async function createFavList(user) {
    setFavProducts({ list: [] });
    await setDoc(
      doc(db, "Favorite", user.uid),
      {
        list: [],
      },
      { merge: true }
    );
  }
  async function addToCart(directory, quantity) {
    if (currentUser === null) history("/Tech-Mode/signup");
    let { list } = await getList("cart");
    let neededToOrgnize;

    function deleteProduct(directory) {
      list = list.filter((product) => {
        if (product.directory === directory) return false;
        return true;
      });
    }

    list.forEach((product) => {
      if (neededToOrgnize === true) return;
      if (product.directory === directory && product.quantity != quantity)
        return deleteProduct(product.directory);
      if (product.directory === directory && product.quantity == quantity)
        return (neededToOrgnize = true);
      neededToOrgnize = false;
    });
    if (neededToOrgnize) return;

    list.push({ quantity, directory });
    setCartProducts({ list });
    await updateDoc(
      doc(db, "cart", currentUser.uid),
      {
        list,
      },
      { merge: true }
    );
  }
  async function addFavorite(directory, { current }) {
    if (currentUser === null) history("/Tech-Mode/signup");

    const favCollect = await getList("Favorite");
    let list;

    if (favCollect.list.includes(directory)) {
      current.classList.remove("added");
      list = favCollect.list.filter((product) => {
        return product !== directory;
      });
    } else {
      current.classList.add("added");
      favCollect.list.push(directory);
      list = favCollect.list;
    }

    setFavProducts({ list });
    await setDoc(
      doc(db, "Favorite", currentUser.uid),
      {
        list,
      },
      { merge: true }
    );
  }
  async function getFavProducts() {
    if (favProducts?.[0] === undefined) {
      const favProducts = await getList("Favorite");

      return favProducts.list;
    }
    return favProducts;
  }
  async function getCartProducts() {
    if (cartProducts?.[0] === undefined) {
      const cartProducts = await getList("cart");
      return cartProducts.list;
    }
    console.log(cartProducts);
    return cartProducts;
  }
  const value = {
    checkout,
    getFavProducts,
    getCartProducts,
    removeCartProduct,
    setQuanitiyDb,
    createFavList,
    createCart,
    addFavorite,
    addToCart,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}
