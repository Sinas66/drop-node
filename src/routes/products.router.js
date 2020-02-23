const router = require("express").Router();
const { getAllProducts, createProduct } = require("../controllers/product");

router.get("/", getAllProducts).post("/", createProduct);

module.exports = router;
