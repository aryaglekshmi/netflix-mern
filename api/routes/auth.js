const router = require("express").Router();
const userContrller = require("../controllers/user")

router.post("/register", userContrller.registerUser);
router.post("/login", userContrller.loginUser);

module.exports = router;