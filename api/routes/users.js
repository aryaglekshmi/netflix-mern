const router = require('express').Router()
const User = require("../models/user");
const CryptoJS = require('crypto-js');
const userContrller = require("../controllers/user")

router.put(":/id", userContrller.update)

module.exports = router;