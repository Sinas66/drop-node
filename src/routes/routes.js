const router = require("express").Router();
const productsRouter = require("./products.router");

router.use("/products", productsRouter).all("*", (req, res) => {
  res.send("Hello world");
});

module.exports = router;
