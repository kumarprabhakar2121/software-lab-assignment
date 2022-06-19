const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");

router.route("/").get(productCtrl.getList).post(productCtrl.add);
router
  .route("/:id")
  .get(productCtrl.getOne)
  .put(productCtrl.update)
  .delete(productCtrl.deleteOne);

module.exports = router;
