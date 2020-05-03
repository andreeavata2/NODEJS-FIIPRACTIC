const router = require("express").Router();

const auth = require("./auth");
const product = require("./product");
const cart = require("./cart");

router.use("/auth", auth);
router.use("/products", product);
router.use("/carts", cart);

module.exports = router;
