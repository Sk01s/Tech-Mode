import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MaterialIconsReact from "material-icons-react";
import { useAuth } from "../context/authenticator";
import { useCategories } from "../context/CategoiresContext";
import { useFavorite } from "../context/setOutFucntions";
import LoadingAnimtion from "../components/LoadingAnimtion";
import DisplayProducts from "../components/DisplayProducts";

export default function CartPage() {
  const categories = useCategories();
  const { currentUser } = useAuth();
  const { setQuanitiyDb, removeCartProduct, getCartProducts, checkout } =
    useFavorite();
  const [isLoading, setIsLoading] = useState();
  const [quantity, setQuanitiy] = useState();
  const [products, setProduct] = useState([]);
  const [price, setPrice] = useState(0);
  const history = useNavigate();

  const calculatePrice = () => {
    setPrice((prev) => {
      return products.reduce((acc, next) => {
        if (next[0]?.price === undefined) return 0;
        return (
          parseFloat(acc) + parseFloat(next[0]?.price) * parseFloat(next[2])
        );
      }, 0);
    });
  };
  useEffect(() => {
    async function getProductByCart() {
      if (currentUser === null) {
        history("/Tech-Mode/login");
        return setProduct(null);
      }
      setIsLoading(true);
      const list = await getCartProducts();

      setProduct(
        // creating an array of products and orginizing them to create cart product
        list.map((product) => {
          const [categoryId, productId] = product.directory.split("-");

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
            parseInt(product.quantity),
          ];
        })
      );
      if (products.length === 0) setIsLoading(false);
    }
    getProductByCart();
  }, [categories, currentUser]);
  useEffect(() => {
    function setStates() {
      if (products[0] === undefined) return;
      setIsLoading(true);
      setQuanitiy(() => {
        return products?.map((product) => product?.[2]);
      });
      calculatePrice();

      setIsLoading(false);
    }
    setStates();
  }, [products]);
  const productsCarts = products?.map((product, index) => {
    if (product[0] === undefined) return;
    return (
      <div
        className="product-cart-card flex align-ce gap-1"
        key={`${product[1]}-${product[0]?.id}`}
      >
        <img src={product[0]?.photos} alt="" />
        <span>{product[0]?.title}</span>
        <span className="flex gap-1 align-ce justify-ce">
          <button
            onClick={() => {
              setPrice(
                (prev) => parseFloat(prev) + parseFloat(product[0]?.price)
              );
              setQuanitiy((prev) => {
                return prev?.map((num, i) => {
                  if (i === index) return num + 1;
                  return num;
                });
              });
              setQuanitiyDb(
                quantity?.[index] + 1,
                `${product[1]}-${product[0]?.id}`
              );
            }}
            className="counter-btn flex align-ce justify-ce"
          >
            <MaterialIconsReact icon="add" />
          </button>
          {quantity?.[index]}
          <button
            onClick={(e) => {
              if (quantity?.[index] === 1) {
                return;
              }
              setPrice(
                (prev) => parseFloat(prev) - parseFloat(product[0]?.price)
              );
              setQuanitiy((prev) => {
                return prev.map((num, i) => {
                  if (i === index) return num - 1;
                  return num;
                });
              });
              setQuanitiyDb(
                quantity?.[index] - 1,
                `${product[1]}-${product[0]?.id}`
              );
            }}
            className="counter-btn flex align-ce justify-ce"
          >
            <MaterialIconsReact icon="remove" />
          </button>
        </span>
        <Link
          to={`/Tech-Mode/product/${product[1]}-${product[0]?.id}-${product[2]}`}
          className="view-link"
        >
          view
        </Link>
        <span className="price">Price: {product[0]?.price} $</span>
        <button
          className="btn-remove pointer"
          onClick={() => {
            setProduct((prevProduct) => {
              return prevProduct.filter((produ) => {
                if (
                  `${produ[1]}-${produ[0].id}` ===
                  `${product[1]}-${product[0]?.id}`
                )
                  return false;
                return true;
              });
            });

            setPrice(
              (prev) =>
                parseFloat(prev) -
                parseFloat(product[0]?.price) * parseFloat(quantity?.[index])
            );
            removeCartProduct(`${product[1]}-${product[0]?.id}`);
          }}
        >
          <MaterialIconsReact icon="cancel" />
        </button>
      </div>
    );
  });
  function createOrder() {
    return products.map((product, index) => {
      return {
        id: `${product[1]}-${product[0].id}`,
        quantity: quantity[index],
      };
    });
  }
  function handleCheckout() {
    const order = createOrder();
    checkout(order);
  }

  if (isLoading) {
    return <LoadingAnimtion />;
  }
  if (!isLoading && products?.length === 0)
    return (
      <div className="container">
        <DisplayProducts products={[]} title=" No product has been added" />;
      </div>
    );
  return (
    <div className="cart-container container flex flex-direc align-ce gap-2">
      {productsCarts}
      <div className="buy-details">
        <div className="sub-total-price">Subtotal : {price} $</div>
        <button className="btn-buy" onClick={handleCheckout}>
          Check Out
        </button>
      </div>
    </div>
  );
}
