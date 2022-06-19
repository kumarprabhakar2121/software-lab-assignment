const router = require("express").Router();
const cartCtrl = require("../controllers/cartCtrl");

router.route("/").get(cartCtrl.getList).post(cartCtrl.add);
router
  .route("/:id")
  .get(cartCtrl.getOne)
  .delete(cartCtrl.deleteOne);

module.exports = router;
