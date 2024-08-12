const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const userRoute = require('./users');

router.use("/user", userRoute);
router.use("/auth", authRoute);


module.exports = router;