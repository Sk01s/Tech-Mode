import MaterialIconsReact from "material-icons-react";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useCategories } from "../context/CategoiresContext";
import { useFavorite } from "../context/setOutFucntions";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

export default function SetOutProduct() {
  const history = useNavigate();
  let { productDirec } = useParams();
  const categoryId = productDirec.split("-")[0];
  const productId = parseInt(productDirec.split("-")[1]);
  const defaultQuantity = parseInt(productDirec.split("-")[2]) || 1;
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [notification, setNotification] = useState(<></>);
  const categories = useCategories();
  const { addFavorite, addToCart } = useFavorite();
  const favBtn = useRef();
  let productData;
  if (parseInt(productDirec.split("-")[2]) === undefined)
    productDirec = productDirec.slice(0, -2);

  if (productDirec) {
    productData = categories
      .find((category) => {
        if (category.id === categoryId) return true;
        return false;
      })
      ?.projects.find((product) => (product.id === productId ? true : false));
  }
  if (productData === undefined) return <></>;
  const { price, photos, title } = productData;

  function handleOrder() {
    addToCart(productDirec, quantity).then(() => history("/Tech-Mode/cart"));
  }
  return (
    <div className="container">
      <main className="product-container flex">
        <div className="img-box flex justify-ce align-ce">
          <img src={photos} alt="" />
        </div>
        <div className="details">
          <h2 className="title">{title}</h2>
          <p className="price">{price} $</p>
          <div className="quantity flex flex-direc">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              min="1"
            />
          </div>
          <div className="flex align-ce">
            <button
              className="btn-add"
              onClick={() => {
                addToCart(productDirec, quantity);
                setNotification(<Popup text={title} title="added to cart" />);
                setTimeout(() => setNotification(<></>), 3000);
              }}
            >
              Add to Cart
            </button>
            <button
              ref={favBtn}
              className="btn-favorite"
              onClick={async () => {
                const isAdded = await addFavorite(productDirec, favBtn);
                setNotification(
                  <Popup title={isAdded ? "added" : "removed"} text={title} />
                );
                setTimeout(() => setNotification(<></>), 3000);
              }}
            >
              <MaterialIconsReact icon="favorite" />
            </button>
          </div>
          <button
            onClick={handleOrder}
            className="btn-buy flex justify-ce align-ce"
          >
            Buy Now
          </button>
        </div>
        {notification}
      </main>
    </div>
  );
}
