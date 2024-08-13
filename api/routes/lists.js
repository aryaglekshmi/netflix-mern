const router = require('express').Router();
const listController = require("../controllers/lists");
const verifyToken = require("../verfiyToken");

// GET routes
router.get("/", verifyToken, listController.getAllLists); // Fetch all lists
router.get("/stats", verifyToken, listController.getListStats); // Fetch list statistics
router.get("/random", verifyToken, listController.getRandomList); // Fetch a random list
router.get("/:id", verifyToken, listController.getList); // Fetch a specific list by ID

// POST routes
router.post("/", verifyToken, listController.newList); // Create a new list

// PUT routes
router.put("/:id", verifyToken, listController.updateList); // Update an existing list

// DELETE routes
router.delete("/:id", verifyToken, listController.deleteList); // Delete a list

module.exports = router;
