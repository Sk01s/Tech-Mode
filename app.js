require("dotenv").config({ path: "./client/src/.env" });
const { getProductPrice } = require("./firebase-config");
const path = require("path");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_API_KEY);

// This is your test secret API key.
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "client", "build")));
app.use(
  cors({
    origin: ["https://sk01s.github.io/", process.env.YOUR_DOMAIN],
  })
);
app.get("/api/categories", (req, res) => {
  res.send();
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.post("/payment/create-checkout-session", async (req, res) => {
  const products = await getProductPrice();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: req.body.items.map(({ id, quantity }) => {
      const { name, priceInCent } = products[id];

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name,
          },
          unit_amount: priceInCent,
        },
        quantity,
      };
    }),
    success_url: `https://${process.env.YOUR_DOMAIN}?success=true`,
    cancel_url: `https://${process.env.YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ url: session.url });
});

app.listen(process.env.PORT || 5500);
