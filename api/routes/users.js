const router = require('express').Router()
const userController = require("../controllers/user")
const verifyToken = require("../verfiyToken")

router
.get('/stats',userController.getUserStats )
.put("/:id", verifyToken ,userController.update)
.delete("/:id", verifyToken ,userController.deleteUser)
.get("/:id", verifyToken , userController.getUser)
.get("/", verifyToken , userController.getAllUser)

module.exports = router;