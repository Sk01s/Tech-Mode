require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore, getDocs, collection } = require("firebase/firestore");

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PRODUCT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APPID,
});

const db = getFirestore(app);

async function getCategories() {
  const data = await getDocs(collection(db, "categories"));
  const categories = {};
  data.forEach((doc) => {
    if (doc.data()?.projects === undefined) return;
    doc.data()?.projects.forEach((product) => {
      categories[`${doc.id}-${product.id}`] = {
        name: product.title,
        priceInCent: parseFloat(product.price) * 100,
      };
    });
  });
  return categories;
}
module.exports = getCategories;
