const router = require("express").Router();
const { productsController } = require("../controllers");

router.get("/", productsController.getProducts);
router.post("/", productsController.createProduct);
router.patch("/:productId", productsController.updateProduct);
router.delete("/:productId", productsController.deleteProduct);

module.exports = router;
