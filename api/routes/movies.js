const router = require('express').Router();
const moviesController = require("../controllers/movies");
const verifyToken = require("../verfiyToken");

// GET routes
router.get("/", verifyToken, moviesController.getAllMovies); // Fetch all movies
router.get("/stats", verifyToken, moviesController.getMovieStats); // Fetch movie statistics
router.get("/random", verifyToken, moviesController.getRandomMovie); // Fetch a random movie
router.get("/:id", verifyToken, moviesController.getMovie); // Fetch a specific movie by ID

// POST routes
router.post("/", verifyToken, moviesController.newMovie); // Create a new movie

// PUT routes
router.put("/:id", verifyToken, moviesController.update); // Update an existing movie

// DELETE routes
router.delete("/:id", verifyToken, moviesController.deleteMovie); // Delete a movie

module.exports = router;
