const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");

router.route("/signup").post(userCtrl.signup);
router.route("/login").post(userCtrl.login);
router.route("/list").get(userCtrl.users);

module.exports = router;
