const router = require('express').Router()
const userController = require("../controllers/user")
const verifyToken = require("../verfiyToken")

router
.get('/movies/liked/:email', userController.getLikedMovies)
.post('/movies/like', userController.addToLikedMovies)
.put('/movies/like', userController.removeFromLikedMovies)

.get('/stats',userController.getUserStats )
.put("/:id", verifyToken ,userController.update)
.delete("/:id", verifyToken ,userController.deleteUser)
.get("/:id", verifyToken , userController.getUser)
.get("/", verifyToken , userController.getAllUser)



module.exports = router;