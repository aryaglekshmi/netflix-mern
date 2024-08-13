const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const userRoute = require('./users');
const movieRoute = require('./movies');
const listRoute = require('./lists');

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/movie", movieRoute);
router.use("/list", listRoute);


module.exports = router;