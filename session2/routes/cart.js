const router = require("express").Router();
const { cartController } = require("../controllers");

router.post("/", cartController.createCart);
router.get("/:cartId", cartController.getCart);

module.exports = router;
