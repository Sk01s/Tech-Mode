const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const admin = require("firebase-admin");

const serviceAccount = require("./tech-mode-firebase-adminsdk-6hvb0-44923cffa8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

async function getCategories() {
  const data = await db.collection("categories").get();
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
