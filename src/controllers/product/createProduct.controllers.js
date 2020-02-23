const Product = require("../../models/product.model");

const ctrateProduct = (req, res) => {
  const { title } = req.body;
  console.log("title :", title);

  const product = new Product({ title });

  product
    .save()
    .then(saved => {
      res.json({ status: "success", product: saved });
    })
    .catch(err => {
      res.status(400).json({ status: "error", err: err.message });
    });
};

module.exports = ctrateProduct;
